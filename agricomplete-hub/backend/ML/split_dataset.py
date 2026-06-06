import os
import shutil
import random

SOURCE_DIR = r"C:\Users\sabir\OneDrive\Desktop\ag\agricomplete-hub\backend\Dataset\subset_dataset"

OUTPUT_DIR = r"C:\Users\sabir\OneDrive\Desktop\ag\agricomplete-hub\backend\Dataset"

TRAIN_DIR = os.path.join(OUTPUT_DIR, "train")
VAL_DIR = os.path.join(OUTPUT_DIR, "validation")
TEST_DIR = os.path.join(OUTPUT_DIR, "test")

random.seed(42)

# Create folders
for folder in [TRAIN_DIR, VAL_DIR, TEST_DIR]:
    os.makedirs(folder, exist_ok=True)

for class_name in os.listdir(SOURCE_DIR):

    class_path = os.path.join(SOURCE_DIR, class_name)

    if not os.path.isdir(class_path):
        continue

    images = [
        img for img in os.listdir(class_path)
        if img.lower().endswith((".jpg", ".jpeg", ".png"))
    ]

    random.shuffle(images)

    train_split = int(0.70 * len(images))
    val_split = int(0.85 * len(images))

    train_imgs = images[:train_split]
    val_imgs = images[train_split:val_split]
    test_imgs = images[val_split:]

    for folder in [
        os.path.join(TRAIN_DIR, class_name),
        os.path.join(VAL_DIR, class_name),
        os.path.join(TEST_DIR, class_name)
    ]:
        os.makedirs(folder, exist_ok=True)

    # Train
    for img in train_imgs:
        shutil.copy2(
            os.path.join(class_path, img),
            os.path.join(TRAIN_DIR, class_name, img)
        )

    # Validation
    for img in val_imgs:
        shutil.copy2(
            os.path.join(class_path, img),
            os.path.join(VAL_DIR, class_name, img)
        )

    # Test
    for img in test_imgs:
        shutil.copy2(
            os.path.join(class_path, img),
            os.path.join(TEST_DIR, class_name, img)
        )

    print(
        f"{class_name}: "
        f"Train={len(train_imgs)}, "
        f"Val={len(val_imgs)}, "
        f"Test={len(test_imgs)}"
    )

print("\nDataset split completed successfully.")