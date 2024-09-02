import sys
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import make_pipeline

# Load your trained model (re-train if necessary)
data = {
    'symptoms': [
        'Itching , Skin Rash, Skin Eruptions',
        'Cough, Fever, Runny Nose',
        'Headache, Fever, Cough',
        'Sneezing, Runny Nose, Itching',
        'Chest Pain, Shortness of Breath, Fatigue',
        'Abdominal Pain, Bloating, Nausea',
        'Joint Pain, Swelling, Redness',
        'Sore Throat, Cough, Difficulty Swallowing',
        'Fever, Chills, Sweating',
        'Nausea, Vomiting, Diarrhea',
        'Muscle Pain, Fatigue, Fever',
        'Back Pain, Muscle Weakness, Numbness',
        'Frequent Urination, Painful Urination',
        'Blurry Vision, Eye Pain, Redness',
        'Dizziness, Lightheadedness, Fainting',
        'Weight Loss, Increased Thirst, Frequent Urination',
        'Skin Lesions, Fatigue, Night Sweats',
        'Unexplained Weight Loss, Persistent Cough, Blood in Sputum',
        'Severe Headache, Stiff Neck, Sensitivity to Light',
        'Extreme Thirst, Dry Mouth, Fatigue',
        'High Fever, Rash, Joint Pain',
        'Coughing Up Blood, Chest Pain, Weight Loss',
        'Painful Red Lump in Skin, Fever',
        'Sudden Severe Headache, Nausea, Sensitivity to Light',
        'Heart Palpitations, Chest Pain, Shortness of Breath',
        'Loss of Taste or Smell Sore Throat, Headache',
        'Shortness of Breath, Chest Pain, Difficulty Breathing'
    ],
    'disease': [
        'Fungal infection',
        'Common cold',
        'Flu',
        'Allergic rhinitis',
        'Heart disease',
        'Gastritis',
        'Arthritis',
        'Strep throat',
        'Malaria',
        'Gastroenteritis',
        'Viral infection',
        'Herniated disc',
        'Urinary tract infection',
        'Conjunctivitis',
        'Vertigo',
        'Diabetes',
        'Tuberculosis',
        'Lung cancer',
        'Meningitis',
        'Dehydration',
        'Dengue fever',
        'Tuberculosis',
        'Boil',
        'Migraine',
        'Arrhythmia',
        'Covid - 19',
        'Covid - 19'
    ]
}

df = pd.DataFrame(data)
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(df['symptoms'], df['disease'])

# Check if symptoms were provided as a command-line argument
if len(sys.argv) > 1:
    symptoms = sys.argv[1]
else:
    print("Error: No symptoms provided. Please provide symptoms as a command-line argument.")
    sys.exit(1)

# Predict the disease
disease_prediction = model.predict([symptoms])[0]

# Print the prediction (this will be sent back to the Node.js server)
print(disease_prediction)

