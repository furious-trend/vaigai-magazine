import os
import fitz  # PyMuPDF
from PIL import Image

def main():
    pdf_path = "source/newsletter.pdf"
    previews_dir = "source/page-previews"
    events_dir = "public/assets/images/events"
    images_dir = "public/assets/images"

    os.makedirs(previews_dir, exist_ok=True)
    os.makedirs(events_dir, exist_ok=True)
    os.makedirs(images_dir, exist_ok=True)

    print("Opening PDF:", pdf_path)
    doc = fitz.open(pdf_path)
    print(f"Total pages: {len(doc)}")

    # 1. Render every page at 150 DPI
    print("Rendering 150 DPI page previews...")
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=150)
        preview_filename = os.path.join(previews_dir, f"page_{i+1:02d}.png")
        pix.save(preview_filename)
        if (i + 1) % 10 == 0 or i == len(doc) - 1:
            print(f"Rendered up to page {i+1}")

    # 2. Extract embedded images per page
    print("Extracting embedded images from pages...")
    extracted_count = 0
    for page_idx, page in enumerate(doc):
        image_list = page.get_images(full=True)
        for img_idx, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Save raw temporary
            temp_path = os.path.join(events_dir, f"temp_p{page_idx+1:02d}_img{img_idx+1:02d}.{image_ext}")
            with open(temp_path, "wb") as f:
                f.write(image_bytes)

            try:
                with Image.open(temp_path) as im:
                    # Convert to RGB/RGBA WebP
                    webp_path = os.path.join(events_dir, f"p{page_idx+1:02d}_img{img_idx+1:02d}.webp")
                    
                    # Resize if wider than 1600px
                    if im.width > 1600:
                        new_height = int(im.height * (1600 / im.width))
                        im_resized = im.resize((1600, new_height), Image.Resampling.LANCZOS)
                        im_resized.save(webp_path, "WEBP", quality=82)
                    else:
                        im.save(webp_path, "WEBP", quality=82)
                    extracted_count += 1
            except Exception as e:
                print(f"Error processing image {temp_path}: {e}")
            finally:
                if os.path.exists(temp_path):
                    os.remove(temp_path)

    print(f"Extracted and converted {extracted_count} images to WebP in {events_dir}")

    # 3. Process Amma portrait from Gemini_Generated_Image_l63acnl63acnl63a.png
    amma_source = "Gemini_Generated_Image_l63acnl63acnl63a.png"
    if os.path.exists(amma_source):
        print("Processing Amma portrait...")
        with Image.open(amma_source) as im:
            # Save WebP and PNG
            im.save(os.path.join(images_dir, "amma.webp"), "WEBP", quality=85)
            # also standard png
            im.save(os.path.join(images_dir, "amma.png"), "PNG")
        print("Amma portrait saved to public/assets/images/amma.webp & .png")

    # 4. Crop Vaigai gear logo from Cover (Page 1)
    p1_preview = os.path.join(previews_dir, "page_01.png")
    if os.path.exists(p1_preview):
        print("Extracting Vaigai gear logo from cover...")
        with Image.open(p1_preview) as im:
            # Looking at page 1 rendered (1275 x 1650):
            # The top has the header and Vaigai College of Engineering emblem/gear logo
            # Let's crop the logo area (top-left / top center)
            # We can also inspect the exact coordinates or extract from xref 62
            pass

    # Also extract xref 62 from page 1 which is the transparent gear/logo
    p1 = doc[0]
    p1_images = p1.get_images()
    for img in p1_images:
        xref = img[0]
        bimg = doc.extract_image(xref)
        if bimg["ext"] == "png" and bimg["width"] < 1000:
            logo_bytes = bimg["image"]
            logo_path = os.path.join(images_dir, "logo.png")
            with open(logo_path, "wb") as f:
                f.write(logo_bytes)
            with Image.open(logo_path) as im:
                im.save(os.path.join(images_dir, "logo.webp"), "WEBP")
                # create favicon
                icon_im = im.resize((64, 64), Image.Resampling.LANCZOS)
                icon_im.save("public/favicon.ico", "ICO")
            print("Extracted official logo and created favicon!")
            break

if __name__ == "__main__":
    main()

