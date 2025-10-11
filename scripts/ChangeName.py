import os

def number_to_word(n):
    """Convert number to word (1 -> One, 2 -> Two, etc.)"""
    numbers = {
        1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
        6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten",
        11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen", 15: "Fifteen",
        16: "Sixteen", 17: "Seventeen", 18: "Eighteen", 19: "Nineteen", 20: "Twenty"
    }
    return numbers.get(n, str(n))

def rename_files_in_folder(folder_path, prefix_lowercase, prefix_capitalized):
    """
    Rename files from prefixImage1.ext to PrefixImageOne.ext
    Example: healthcareImage1.webp → HealthcareImageOne.webp
    """
    if not os.path.exists(folder_path):
        print(f"❌ Folder not found: {folder_path}")
        return
    
    files = os.listdir(folder_path)
    renamed_count = 0
    
    for filename in files:
        file_path = os.path.join(folder_path, filename)
        if os.path.isdir(file_path):
            continue
        
        # Check if file starts with lowercase or capitalized prefix
        if filename.startswith(prefix_lowercase + "Image") or filename.startswith(prefix_capitalized + "Image"):
            extension = os.path.splitext(filename)[1]
            
            try:
                name_without_ext = os.path.splitext(filename)[0]
                number_str = ''.join(filter(str.isdigit, name_without_ext))
                
                if number_str:
                    number = int(number_str)
                    word_number = number_to_word(number)
                    new_filename = f"{prefix_capitalized}Image{word_number}{extension}"
                    
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
print("Converting: healthcareImage1 → HealthcareImageOne\n")

for folder_name, prefix_lower, prefix_capital in folders_to_process:
    folder_path = os.path.join(base_path, folder_name)
    print(f"📁 Processing {folder_name} folder...")
    rename_files_in_folder(folder_path, prefix_lower, prefix_capital)

print("\n✅ All done!")
print("\nNow update your imports to use word numbers:")
print('import HealthcareImgOne from "@/assets/.../HealthcareImageOne.webp";')