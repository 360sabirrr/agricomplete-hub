import os

subset_path = r"C:\Users\sabir\OneDrive\Desktop\ag\agricomplete-hub\backend\Dataset\subset_dataset"

total = 0

for cls in os.listdir(subset_path):
    cls_path = os.path.join(subset_path, cls)

    if os.path.isdir(cls_path):
        count = len(os.listdir(cls_path))
        total += count

print("Total Images:", total)
print("Total Classes:", len(os.listdir(subset_path)))