import os
from PIL import Image

input_folder = "../public/NRC_wave"
output_folder = "../public/NRC_wave_output"

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.lower().endswith(".png"):
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path)

        # Quantize (reduce colors smartly, still looks same)
        img = img.convert("P", palette=Image.ADAPTIVE, colors=256)

        output_path = os.path.join(output_folder, filename)

        # Save optimized PNG
        img.save(output_path, format="PNG", optimize=True)

        size_kb = os.path.getsize(output_path) // 1024
        print(f"Optimized: {filename} -> {size_kb} KB")
