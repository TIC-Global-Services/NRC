import os

def rename_files_in_folder(folder_path, prefix_lowercase, prefix_capitalized):
    """
    Rename files from prefixImageN.ext to PrefixImageN.ext
    Example: healthcareImage1.webp → HealthcareImage1.webp
    """
    if not os.path.exists(folder_path):
        print(f"❌ Folder not found: {folder_path}")
        return
    
    files = os.listdir(folder_path)
    renamed_count = 0
    
    for filename in files:
        # Skip if it's a directory
        file_path = os.path.join(folder_path, filename)
        if os.path.isdir(file_path):
            continue
        
        # Check if file starts with lowercase prefix
        if filename.startswith(prefix_lowercase + "Image"):
            # Get extension
            extension = os.path.splitext(filename)[1]
            
            # Extract the number
            try:
                name_without_ext = os.path.splitext(filename)[0]
                number = ''.join(filter(str.isdigit, name_without_ext))
                
                if number:
                    # Create the new capitalized name
                    new_filename = f"{prefix_capitalized}Image{number}{extension}"
                    
                    # Only rename if different
                    if filename != new_filename:
                        old_path = os.path.join(folder_path, filename)
                        new_path = os.path.join(folder_path, new_filename)
                        
                        os.rename(old_path, new_path)
                        print(f"✅ Renamed: {filename} → {new_filename}")
                        renamed_count += 1
                    else:
                        print(f"⏭️  Skipped (already correct): {filename}")
            except Exception as e:
                print(f"⚠️  Error processing {filename}: {e}")
    
    if renamed_count == 0:
        print(f"✨ All files in {folder_path} are already correctly named!")
    else:
        print(f"🎉 Renamed {renamed_count} files in {folder_path}\n")

# Base path - USE RAW STRING for Windows paths
base_path = r"D:\PROJECTS\TIC\NRC\assets\CorporateAdvisory\TrackRecord"

# Define folders with lowercase and capitalized prefixes
folders_to_process = [
    ("Healthcare", "healthcare", "Healthcare"),
    ("Tech", "tech", "Tech"),
    ("Commerce", "commerce", "Commerce"),
    ("Industrial", "industrial", "Industrial"),
]

print("🚀 Starting file rename process...\n")
print("Converting: healthcareImage1 → HealthcareImage1\n")

for folder_name, prefix_lower, prefix_capital in folders_to_process:
    folder_path = os.path.join(base_path, folder_name)
    print(f"📁 Processing {folder_name} folder...")
    rename_files_in_folder(folder_path, prefix_lower, prefix_capital)

print("\n✅ All done!")
print("\nNow update your imports to use capitalized names:")
print('import HealthcareImg1 from "@/assets/.../HealthcareImage1.webp";')