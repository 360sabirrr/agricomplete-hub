import tensorflow as tf
import numpy as np
import json
from tensorflow.keras.preprocessing import image

# Paths
MODEL_PATH = r"C:\Users\sabir\OneDrive\Desktop\ag\agricomplete-hub\backend\models\crop_disease_model.keras"
CLASS_PATH = r"C:\Users\sabir\OneDrive\Desktop\ag\agricomplete-hub\backend\ML\class_names.json"

# Load model
model = tf.keras.models.load_model(MODEL_PATH)

# Load class names
with open(CLASS_PATH, "r") as f:
    class_names = json.load(f)

IMG_SIZE = (128, 128)


def predict_disease(img_path):
    img = image.load_img(img_path, target_size=IMG_SIZE)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)

    # Preprocess (same as training MobileNetV2)
    img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)

    predictions = model.predict(img_array)

    predicted_index = np.argmax(predictions[0])
    confidence = float(np.max(predictions[0]))

    return {
        "disease": class_names[predicted_index],
        "confidence": round(confidence * 100, 2)
    }


# TEST (optional)
if __name__ == "__main__":
    test_image = r"C:\Users\sabir\OneDrive\Desktop\ag\agricomplete-hub\backend\Dataset\test\Tomato___Late_blight\some_image.jpg"

    result = predict_disease(test_image)

    print("\nPrediction Result:")
    print(result)