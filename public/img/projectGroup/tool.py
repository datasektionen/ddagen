from PIL import Image
import re
import os

def find_files(path_to_folder, img_regex):

    # Find all files matching the regex
    pattern = re.compile(img_regex)
    matched_files = [file for file in os.listdir(path_to_folder) if pattern.match(file)]
    return matched_files

def downscale_and_crop(path, scale_size, crop_size):
    """
    Downscale and crop an image.

    :param image_path: Path to the input image.
    :param output_path: Path to save the processed image.
    :param scale_size: New size (width, height) to which the image is to be scaled.
    :param crop_size: Size (width, height) of the cropped area.
    """
    # Open the image
    with Image.open(path) as img:
        # Downscale the image using high-quality Lanczos resampling
        if((img.width,img.height) == crop_size):
            return

        img.thumbnail(scale_size, Image.Resampling.LANCZOS)
        
        # Calculate cropping area
        left = 0 #(img.width - crop_size[0]) / 2
        top = 0 #(img.height - crop_size[1]) / 2
        right = img.width
        bottom = crop_size[1]
        
        # Crop the image
        img_cropped = img.crop((left, top, right, bottom))
       
        # Save the cropped image
        img_cropped.save(path)

def write_names_to_file(list_of_names, file_name):
    with open(file_name, 'w') as f:
        for item in list_of_names:
            f.write("%s\n" % item)

# Example usage
img_regex = r"p_.*.jpg"
scale_size = (744, 1116)  # New size to which the image will be downscaled these 
crop_size = (744, 930)  # Size of the cropped area

items = list(find_files("./",img_regex))
for p in items:
    downscale_and_crop(p, scale_size, crop_size)

write_names_to_file(items, "names.txt")
