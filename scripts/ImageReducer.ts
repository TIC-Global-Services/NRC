const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const baseFolder = path.join(__dirname, "../assets/CorporateAdvisory/TrackRecord");
const subfolders = ["Tech", "Commerce", "HealthCare", "Industrial"];
const uniformSize = { width: 400, height: 400 };

subfolders.forEach((folder) => {
  const folderPath = path.join(baseFolder, folder);

  if (!fs.existsSync(folderPath)) {
    console.log(`Folder not found: ${folderPath}`);
    return;
  }

  fs.readdirSync(folderPath).forEach((fileName: any) => {
    const filePath = path.join(folderPath, fileName);

    if (!fileName.match(/\.(png|jpe?g|webp|bmp|gif)$/i)) return;

    sharp(filePath)
      .resize(uniformSize.width, uniformSize.height)
      .toBuffer()
      .then((data: any) => fs.writeFileSync(filePath, data))
      .then(() => console.log(`Resized: ${filePath}`))
      .catch((err: any) => console.log(`Error processing ${filePath}: ${err}`));
  });
});

console.log("All images resized successfully!");