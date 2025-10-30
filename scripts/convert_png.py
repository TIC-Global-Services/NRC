#!/usr/bin/env python3
"""
Converts all .webp images in the current folder to .png format.
Converted images will be saved inside a 'converted' subfolder.
"""

import os
from PIL import Image

def convert_webp_to_png():
    folder = os.getcwd()  # Current directory
    output_dir = os.path.join(folder, "converted")
    os.makedirs(output_dir, exist_ok=True)

    webp_files = [f for f in os.listdir(folder) if f.lower().endswith(".webp")]

    if not webp_files:
        print("⚠️  No .webp images found in this folder.")
        return

    print(f"📂 Found {len(webp_files)} .webp image(s). Converting...\n")

    converted = 0
    for filename in webp_files:
        try:
            src = os.path.join(folder, filename)
            dst = os.path.join(output_dir, os.path.splitext(filename)[0] + ".png")

            img = Image.open(src).convert("RGBA")
            img.save(dst, "PNG")

            print(f"✅ {filename} → converted/{os.path.basename(dst)}")
            converted += 1
        except Exception as e:
            print(f"❌ Failed to convert {filename}: {e}")

    print(f"\n🎉 Done! {converted}/{len(webp_files)} image(s) converted successfully.")
    print(f"📁 Converted images are saved in: {output_dir}")


if __name__ == "__main__":
    convert_webp_to_png()
