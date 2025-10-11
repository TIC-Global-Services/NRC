import os
from PIL import Image

# Folder containing all subfolders
base_folder = r"D:\PROJECTS\TIC\NRC\assets\CorporateAdvisory\TrackRecord"

# Desired uniform size (width, height)
uniform_size = (400, 400)  # You can change this to whatever size you want

# List all subfolders
subfolders = ["Tech", "Commerce", "HealthCare", "Industrial"]

for folder in subfolders:
    folder_path = os.path.join(base_folder, folder)
    
    if not os.path.exists(folder_path):
        print(f"Folder not found: {folder_path}")
        continue

    # Process all images in the folder
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)
        
        # Only process image files
        if not file_name.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif")):
            continue
        
        try:
            with Image.open(file_path) as img:
                # Resize image
                img = img.resize(uniform_size, Image.ANTIALIAS)
                
                # Save image, overwrite original
                img.save(file_path)
                
                print(f"Resized: {file_path}")
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

print("All images resized successfully!")
