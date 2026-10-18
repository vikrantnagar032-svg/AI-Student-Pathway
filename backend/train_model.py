import os
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

BASE_DIR = os.path.dirname(__file__)
DATASET_PATH = os.path.join(BASE_DIR, "data", "career_dataset.csv")
MODEL_PATH = os.path.join(BASE_DIR, "data", "career_model.pkl")

# 1. LOAD DATASET
df = pd.read_csv(DATASET_PATH)

# 2. INPUT & OUTPUT
X = df.drop("career", axis=1)
y = df["career"]

# 3. TRAIN / TEST SPLIT
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# 4. RANDOM FOREST MODEL
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

# 5. TRAIN MODEL
model.fit(X_train, y_train)

# 6. TEST MODEL
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Model Accuracy:", accuracy)

# 7. SAVE MODEL
joblib.dump(model, MODEL_PATH)
print(f"Model saved successfully to {MODEL_PATH}!")