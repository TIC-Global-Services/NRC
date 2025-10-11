import os

def rename_images(folder_path, prefix="techImage"):
    """
    Rename all image files in a folder with a sequential name.
    Args:
        folder_path (str): Path to the folder containing images.
        prefix (str): Prefix for the new file names.
    """
    # Get all files in the folder
    files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    
    # Filter for image files (you can add more extensions if needed)
    image_extensions = (".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp")
    images = [f for f in files if f.lower().endswith(image_extensions)]
    
    # Sort files to maintain a consistent order
    images.sort()
    
    # Rename images sequentially
    for idx, image in enumerate(images, start=1):
        ext = os.path.splitext(image)[1]  # Keep the original extension
        new_name = f"{prefix}{idx}{ext}"
        old_path = os.path.join(folder_path, image)
        new_path = os.path.join(folder_path, new_name)
        os.rename(old_path, new_path)
        print(f"Renamed: {image} -> {new_name}")

# ---- Function call ----
folder_path = r"D:\PROJECTS\TIC\NRC\assets\CorporateAdvisory\TrackRecord\Tech"
rename_images(folder_path, prefix="techImage")