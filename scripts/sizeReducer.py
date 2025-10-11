import os
from PIL import Image

input_folder = "../public/NRC_wave"
output_folder = "../public/NRC_wave_output"

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.lower().endswith(".png"):
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path)
        
        original_size = os.path.getsize(img_path) // 1024
        output_path = os.path.join(output_folder, filename)
        
        # Lossless optimization - NO quality loss
        img.save(output_path, format="PNG", optimize=True, compress_level=9)
        
        optimized_size = os.path.getsize(output_path) // 1024
        reduction = ((original_size - optimized_size) / original_size) * 100
        
        print(f"{filename}: {original_size} KB -> {optimized_size} KB ({reduction:.1f}% reduction)")