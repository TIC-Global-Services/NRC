export interface PortfolioRow {
  month: string;
  benchmark: number;
  portfolio: number;
}

export async function fetchPortfolioData(): Promise<PortfolioRow[]> {
  const url = process.env.NEXT_PUBLIC_HOME_SHEET_URL;

  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SHEET_URL in .env.local");
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch Google Sheet data");

  const raw = await res.json();

  console.log("Raw portfolio data:", raw);
  console.log("First row keys:", Object.keys(raw[0] || {}));

  // Helper function to safely parse numbers
  const parseValue = (value: any): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      // Remove % sign if present and parse
      const cleanValue = value.replace('%', '').trim();
      const parsed = parseFloat(cleanValue);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Convert sheet JSON into chart-ready format using ONLY actual data
  const formatted: PortfolioRow[] = raw
    .map((row: any, index: number) => {
      console.log(`Processing row ${index}:`, row);

      // Get all possible month/date column names from the row
      const possibleMonthKeys = Object.keys(row).filter(key =>
        key.toLowerCase().includes('month') ||
        key.toLowerCase().includes('date') ||
        key === 'Month' ||
        key === 'Date'
      );

      console.log("Found possible month keys:", possibleMonthKeys);

      // Try to get month value from the row
      let monthValue = null;
      for (const key of possibleMonthKeys) {
        if (row[key] && row[key] !== '') {
          monthValue = row[key];
          console.log(`Using month from key "${key}":`, monthValue);
          break;
        }
      }

      // If no month column found or empty, skip this row
      if (!monthValue || monthValue === '') {
        console.log(`Skipping row ${index} - no valid month data`);
        return null;
      }

      // Get benchmark and portfolio values
      const benchmarkKeys = Object.keys(row).filter(key =>
        key.includes('BSE') || key.includes('500') || key.toLowerCase().includes('benchmark')
      );

      const portfolioKeys = Object.keys(row).filter(key =>
        key.includes('NRC') || key.includes('Aurum') || key.includes('Portfolio')
      );

      console.log("Found benchmark keys:", benchmarkKeys);
      console.log("Found portfolio keys:", portfolioKeys);

      let benchmark = 0;
      let portfolio = 0;

      // Get benchmark value
      for (const key of benchmarkKeys) {
        const value = parseValue(row[key]);
        if (value !== 0) {
          benchmark = value;
          console.log(`Using benchmark from key "${key}":`, benchmark);
          break;
        }
      }

      // Get portfolio value  
      for (const key of portfolioKeys) {
        const value = parseValue(row[key]);
        if (value !== 0) {
          portfolio = value;
          console.log(`Using portfolio from key "${key}":`, portfolio);
          break;
        }
      }

      // Skip rows where both benchmark and portfolio are 0 (no real data)
      if (benchmark === 0 && portfolio === 0) {
        console.log(`Skipping row ${index} - no valid benchmark or portfolio data`);
        return null;
      }

      return {
        month: monthValue.toString(), // Use exactly what's in the sheet
        benchmark,
        portfolio,
      };
    })
    .filter((row: PortfolioRow | null): row is PortfolioRow => row !== null); // Remove null entries

  console.log("Final formatted data:", formatted);
  console.log(`Total valid data points: ${formatted.length}`);

  return formatted;
}

// Helper function to parse month-year string and convert to Date for sorting
function parseMonthYear(monthStr: string): Date {
  // Handle different date formats: "Dec-12", "Dec-2012", "12/2012", etc.
  const formats = [
    // Format: "Dec-12" or "Dec-2012"
    /^([A-Za-z]{3})-(\d{2,4})$/,
    // Format: "12/2012" or "Dec/2012" 
    /^([A-Za-z]{3}|\d{1,2})\/(\d{4})$/,
    // Format: "2012-12" or "2012-Dec"
    /^(\d{4})-([A-Za-z]{3}|\d{1,2})$/
  ];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (const format of formats) {
    const match = monthStr.match(format);
    if (match) {
      let month: number;
      let year: number;

      if (format === formats[0]) { // "Dec-12" or "Dec-2012"
        const monthName = match[1];
        month = monthNames.indexOf(monthName);
        year = parseInt(match[2]);
        if (year < 100) year += 2000; // Convert 12 to 2012
      } else if (format === formats[1]) { // "12/2012" or "Dec/2012"
        const monthPart = match[1];
        if (isNaN(parseInt(monthPart))) {
          month = monthNames.indexOf(monthPart);
        } else {
          month = parseInt(monthPart) - 1; // Convert 1-12 to 0-11
        }
        year = parseInt(match[2]);
      } else { // "2012-12" or "2012-Dec"
        year = parseInt(match[1]);
        const monthPart = match[2];
        if (isNaN(parseInt(monthPart))) {
          month = monthNames.indexOf(monthPart);
        } else {
          month = parseInt(monthPart) - 1;
        }
      }

      if (month >= 0 && month <= 11 && year > 1900) {
        return new Date(year, month);
      }
    }
  }

  // Fallback: return current date if parsing fails
  console.warn(`Could not parse date: ${monthStr}`);
  return new Date();
}

// Sort data chronologically
export function sortDataChronologically(data: PortfolioRow[]): PortfolioRow[] {
  return data.sort((a, b) => {
    const dateA = parseMonthYear(a.month);
    const dateB = parseMonthYear(b.month);
    return dateA.getTime() - dateB.getTime();
  });
}

// Get data range information
export function getDataRange(data: PortfolioRow[]): {
  startMonth: string;
  endMonth: string;
  startDate: Date;
  endDate: Date;
  totalMonths: number;
} {
  if (data.length === 0) {
    const now = new Date();
    return {
      startMonth: '',
      endMonth: '',
      startDate: now,
      endDate: now,
      totalMonths: 0
    };
  }

  const sortedData = sortDataChronologically([...data]);
  const startDate = parseMonthYear(sortedData[0].month);
  const endDate = parseMonthYear(sortedData[sortedData.length - 1].month);

  // Calculate total months between start and end
  const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) + 1;

  return {
    startMonth: sortedData[0].month,
    endMonth: sortedData[sortedData.length - 1].month,
    startDate,
    endDate,
    totalMonths
  };
}

// Smart sampling function to get optimal data points for display
export function getOptimalDisplayData(
  data: PortfolioRow[],
  maxPoints: number = 20
): PortfolioRow[] {
  if (data.length === 0) return [];

  // Sort data chronologically first
  const sortedData = sortDataChronologically([...data]);

  // If we have fewer points than maxPoints, return all data
  if (sortedData.length <= maxPoints) {
    console.log(`Data length (${sortedData.length}) <= maxPoints (${maxPoints}), returning all data`);
    return sortedData;
  }

  console.log(`Sampling ${sortedData.length} data points down to ${maxPoints} points`);

  const selectedIndices = new Set<number>();

  // Always include first and last data points
  selectedIndices.add(0);
  selectedIndices.add(sortedData.length - 1);

  // Calculate how many intermediate points we need
  const intermediatePoints = maxPoints - 2; // Subtract first and last

  if (intermediatePoints > 0) {
    // Strategy 1: Try to get evenly distributed points
    const totalSpan = sortedData.length - 1;
    const step = totalSpan / (intermediatePoints + 1);

    for (let i = 1; i <= intermediatePoints; i++) {
      const index = Math.round(step * i);
      if (index > 0 && index < sortedData.length - 1) {
        selectedIndices.add(index);
      }
    }

    // Strategy 2: If we still need more points, try to get year-end or year-start points
    if (selectedIndices.size < maxPoints) {
      const remainingPoints = maxPoints - selectedIndices.size;
      const yearEndMonths = ['Dec', 'Nov', 'Jan']; // Prefer year-end, then year-start

      for (const monthName of yearEndMonths) {
        if (selectedIndices.size >= maxPoints) break;

        for (let i = 1; i < sortedData.length - 1; i++) {
          if (selectedIndices.size >= maxPoints) break;

          if (sortedData[i].month.includes(monthName) && !selectedIndices.has(i)) {
            selectedIndices.add(i);
          }
        }
      }
    }

    // Strategy 3: Fill remaining spots with evenly distributed points if still needed
    if (selectedIndices.size < maxPoints) {
      const remainingPoints = maxPoints - selectedIndices.size;
      const availableIndices = [];

      for (let i = 1; i < sortedData.length - 1; i++) {
        if (!selectedIndices.has(i)) {
          availableIndices.push(i);
        }
      }

      // Take evenly distributed points from available indices
      const pickStep = Math.floor(availableIndices.length / remainingPoints) || 1;
      for (let i = 0; i < remainingPoints && i * pickStep < availableIndices.length; i++) {
        selectedIndices.add(availableIndices[i * pickStep]);
      }
    }
  }

  // Convert set to sorted array and map to actual data
  const finalIndices = Array.from(selectedIndices).sort((a, b) => a - b);
  const result = finalIndices.map(i => sortedData[i]);

  console.log(`Selected ${result.length} points from ${sortedData.length} total points`);
  console.log("Selected data points:", result.map(d => d.month));
  console.log("Selected indices:", finalIndices);

  return result;
}

// Alternative: Get data with specific interval (yearly, quarterly, etc.)
export function getDataByInterval(
  data: PortfolioRow[],
  interval: 'yearly' | 'quarterly' | 'biannual' = 'yearly'
): PortfolioRow[] {
  if (data.length === 0) return [];

  const sortedData = sortDataChronologically([...data]);
  const result = [];
  const seenPeriods = new Set<string>();

  // Always include first point
  result.push(sortedData[0]);
  const firstDate = parseMonthYear(sortedData[0].month);
  seenPeriods.add(getPeriodKey(firstDate, interval));

  // Process intermediate points
  for (let i = 1; i < sortedData.length - 1; i++) {
    const currentDate = parseMonthYear(sortedData[i].month);
    const periodKey = getPeriodKey(currentDate, interval);

    if (!seenPeriods.has(periodKey)) {
      result.push(sortedData[i]);
      seenPeriods.add(periodKey);
    }
  }

  // Always include last point
  const lastDate = parseMonthYear(sortedData[sortedData.length - 1].month);
  const lastPeriodKey = getPeriodKey(lastDate, interval);
  if (!seenPeriods.has(lastPeriodKey)) {
    result.push(sortedData[sortedData.length - 1]);
  }

  console.log(`${interval} data points:`, result.map(d => d.month));
  return result;
}

// Helper function to generate period keys for interval-based sampling
function getPeriodKey(date: Date, interval: 'yearly' | 'quarterly' | 'biannual'): string {
  const year = date.getFullYear();
  const month = date.getMonth();

  switch (interval) {
    case 'yearly':
      return year.toString();
    case 'quarterly':
      const quarter = Math.floor(month / 3) + 1;
      return `${year}-Q${quarter}`;
    case 'biannual':
      const half = month < 6 ? 'H1' : 'H2';
      return `${year}-${half}`;
    default:
      return year.toString();
  }
}

// Main function to get display-ready data
export function getDisplayData(
  data: PortfolioRow[],
  maxPoints: number = 20,
  preferredStrategy: 'optimal' | 'yearly' | 'quarterly' = 'optimal'
): PortfolioRow[] {
  const { totalMonths } = getDataRange(data);

  console.log(`Processing ${data.length} data points spanning ${totalMonths} months`);

  switch (preferredStrategy) {
    case 'yearly':
      return getDataByInterval(data, 'yearly');
    case 'quarterly':
      return getDataByInterval(data, 'quarterly');
    case 'optimal':
    default:
      return getOptimalDisplayData(data, maxPoints);
  }
}