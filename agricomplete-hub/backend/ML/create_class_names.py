import tensorflow as tf
import json

TRAIN_DIR = r"C:\Users\sabir\OneDrive\Desktop\ag\agricomplete-hub\backend\Dataset\train"

train_ds = tf.keras.utils.image_dataset_from_directory(
    TRAIN_DIR,
    image_size=(128, 128),
    batch_size=16
)

class_names = train_ds.class_names

print("Classes found:", len(class_names))

with open(r"C:\Users\sabir\OneDrive\Desktop\ag\agricomplete-hub\backend\ML\class_names.json", "w") as f:
    json.dump(class_names, f)

print("class_names.json created successfully ✔")