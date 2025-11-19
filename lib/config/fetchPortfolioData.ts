export interface PortfolioRow {
  month: string;
  benchmark: number;
  portfolio: number;
}

export interface PortfolioResponse {
  data: PortfolioRow[];
  lastUpdated?: string;
  sheetName?: string;
}

/**
 * Fetches portfolio data (works for both Home & PMS)
 * Reads from Apps Script endpoint that returns { rows, lastUpdated, sheetName }
 */
export async function fetchPortfolioData(
  type: "home" | "pms"
): Promise<PortfolioResponse> {
  const baseUrl =
    type === "home"
      ? process.env.NEXT_PUBLIC_HOME_SHEET_URL
      : process.env.NEXT_PUBLIC_PMS_SHEET_URL;

  if (!baseUrl) throw new Error(`Missing sheet URL for type: ${type}`);

  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error("Failed to fetch Google Sheet data");

  const json = await res.json();
  console.log("Fetched JSON:", json);
  const raw = Array.isArray(json) ? json : json.rows || [];

  // Safely parse numbers (handles %, commas, empty strings)
  const parseValue = (value: any): number => {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const clean = value.replace(/[%,]/g, "").trim();
      const parsed = parseFloat(clean);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Convert sheet JSON into chart-ready data
  const formatted: PortfolioRow[] = raw
    .map((row: any) => {
      const monthKey = Object.keys(row).find((key) =>
        key.toLowerCase().includes("month")
      );
      const month = monthKey ? row[monthKey] : row["Month"];
      if (!month) return null;

      const benchmarkKeys =
        type === "home"
          ? Object.keys(row).filter(
              (k) =>
                k.includes("BSE") ||
                k.includes("500") ||
                k.toLowerCase().includes("benchmark")
            )
          : Object.keys(row).filter(
              (k) =>
                k.includes("S&P") ||
                k.includes("BSE") ||
                k.includes("500") ||
                k.includes("Index")
            );

      const portfolioKeys =
        type === "home"
          ? Object.keys(row).filter(
              (k) =>
                k.includes("NRC") ||
                k.includes("Aurum") ||
                k.includes("Portfolio")
            )
          : Object.keys(row).filter(
              (k) =>
                k.includes("Aurum") ||
                k.includes("Multiplier") ||
                k.includes("Portfolio")
            );

      let benchmark = 0;
      let portfolio = 0;

      if (benchmarkKeys.length > 0)
        benchmark = parseValue(row[benchmarkKeys[0]]);
      if (portfolioKeys.length > 0)
        portfolio = parseValue(row[portfolioKeys[0]]);

      if (benchmark === 0 && portfolio === 0) return null;

      return {
        month: month.toString(),
        benchmark,
        portfolio,
      };
    })
    .filter((r: any): r is PortfolioRow => r !== null);

  console.log("Fetched JSON:", json);
  console.log("Detected lastUpdated:", json.lastUpdated);

  return {
    data: formatted,
    lastUpdated:
      json.lastUpdated ||
      json.last_updated ||
      json.updatedAt ||
      json.updated_at ||
      null,
    sheetName: json.sheetName || json.sheet || null,
  };
}

// ────────────────────────────────────────────────
// Utility: Month parsing, sorting & data shaping
// ────────────────────────────────────────────────

function parseMonthYear(monthStr: string): Date {
  const formats = [
    /^([A-Za-z]{3})-(\d{2,4})$/,
    /^([A-Za-z]{3}|\d{1,2})\/(\d{4})$/,
    /^(\d{4})-([A-Za-z]{3}|\d{1,2})$/,
  ];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (const format of formats) {
    const match = monthStr.match(format);
    if (!match) continue;

    let month = 0;
    let year = 0;

    if (format === formats[0]) {
      const [_, mon, yr] = match;
      month = monthNames.indexOf(mon);
      year = parseInt(yr);
      if (year < 100) year += 2000;
    } else if (format === formats[1]) {
      const [_, part, yr] = match;
      month = isNaN(+part) ? monthNames.indexOf(part) : parseInt(part) - 1;
      year = parseInt(yr);
    } else {
      const [_, yr, part] = match;
      year = parseInt(yr);
      month = isNaN(+part) ? monthNames.indexOf(part) : parseInt(part) - 1;
    }

    if (month >= 0 && year > 1900) return new Date(year, month);
  }

  console.warn("Unrecognized date:", monthStr);
  return new Date();
}

export function sortDataChronologically(data: PortfolioRow[]): PortfolioRow[] {
  return data.sort(
    (a, b) =>
      parseMonthYear(a.month).getTime() - parseMonthYear(b.month).getTime()
  );
}

export function getDataRange(data: PortfolioRow[]) {
  if (!data.length)
    return {
      startMonth: "",
      endMonth: "",
      totalMonths: 0,
      startDate: new Date(),
      endDate: new Date(),
    };

  const sorted = sortDataChronologically(data);
  const startDate = parseMonthYear(sorted[0].month);
  const endDate = parseMonthYear(sorted[sorted.length - 1].month);

  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1;

  return {
    startMonth: sorted[0].month,
    endMonth: sorted[sorted.length - 1].month,
    totalMonths,
    startDate,
    endDate,
  };
}

// ────────────────────────────────────────────────
// DISPLAY DATA UTILITIES (includes getDisplayData)
// ────────────────────────────────────────────────

export function getDisplayData(
  data: PortfolioRow[],
  maxPoints: number = 20,
  preferredStrategy: "optimal" | "yearly" | "quarterly" = "optimal"
): PortfolioRow[] {
  if (data.length === 0) return [];

  switch (preferredStrategy) {
    case "yearly":
      return getDataByInterval(data, "yearly");
    case "quarterly":
      return getDataByInterval(data, "quarterly");
    case "optimal":
    default:
      return getOptimalDisplayData(data, maxPoints);
  }
}

// Optimized sampling for max visible points
function getOptimalDisplayData(
  data: PortfolioRow[],
  maxPoints: number = 20
): PortfolioRow[] {
  const sorted = sortDataChronologically([...data]);
  if (sorted.length <= maxPoints) return sorted;

  const total = sorted.length - 1;
  const step = total / (maxPoints - 1);
  const result: PortfolioRow[] = [];

  for (let i = 0; i < maxPoints; i++) {
    const index = Math.round(step * i);
    result.push(sorted[index]);
  }

  return result;
}

// Get data by fixed interval (yearly, quarterly, etc.)
function getDataByInterval(
  data: PortfolioRow[],
  interval: "yearly" | "quarterly" | "biannual" = "yearly"
): PortfolioRow[] {
  const sorted = sortDataChronologically([...data]);
  const result: PortfolioRow[] = [];
  const seen = new Set<string>();

  const key = (date: Date): string => {
    const y = date.getFullYear();
    const m = date.getMonth();
    if (interval === "yearly") return y.toString();
    if (interval === "quarterly") return `${y}-Q${Math.floor(m / 3) + 1}`;
    return `${y}-${m < 6 ? "H1" : "H2"}`;
  };

  for (const row of sorted) {
    const d = parseMonthYear(row.month);
    const k = key(d);
    if (!seen.has(k)) {
      seen.add(k);
      result.push(row);
    }
  }

  return result;
}
