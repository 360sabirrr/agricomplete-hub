import os
import shutil
import random

# Correct source folder (one level deeper)
SOURCE_DIR = r"C:\Users\sabir\OneDrive\Desktop\ag\agricomplete-hub\backend\Dataset\with_augmentation\Plant_leave_diseases_dataset_with_augmentation"

# Destination folder
DEST_DIR = r"C:\Users\sabir\OneDrive\Desktop\ag\agricomplete-hub\backend\Dataset\subset_dataset"

IMAGES_PER_CLASS = 100

random.seed(42)

# Remove old subset if it exists
if os.path.exists(DEST_DIR):
    shutil.rmtree(DEST_DIR)

os.makedirs(DEST_DIR, exist_ok=True)

total_images = 0
total_classes = 0

for class_name in os.listdir(SOURCE_DIR):

    class_path = os.path.join(SOURCE_DIR, class_name)

    if not os.path.isdir(class_path):
        continue

    images = [
        f for f in os.listdir(class_path)
        if f.lower().endswith((".jpg", ".jpeg", ".png"))
    ]

    if len(images) == 0:
        continue

    target_class_dir = os.path.join(DEST_DIR, class_name)
    os.makedirs(target_class_dir, exist_ok=True)

    selected_images = random.sample(
        images,
        min(IMAGES_PER_CLASS, len(images))
    )

    for image in selected_images:
        src = os.path.join(class_path, image)
        dst = os.path.join(target_class_dir, image)

        shutil.copy2(src, dst)

    print(f"{class_name} -> {len(selected_images)} images copied")

    total_images += len(selected_images)
    total_classes += 1

print("\n" + "=" * 50)
print("Subset Dataset Created Successfully")
print(f"Total Classes : {total_classes}")
print(f"Total Images  : {total_images}")
print("=" * 50)