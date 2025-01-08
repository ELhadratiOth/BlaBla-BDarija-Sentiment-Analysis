import requests
import json
import arabicstopwords.arabicstopwords as stp
from pydoda import Category, CustomCategory
import pandas as pd

negation_terms = ["لا", "لم", "لن", "ما", "ليس", "بدون", "غير", "عدم", "مستحيل", "مشي", "ماشي", "بلاش", "والو", "غير", "ماكاينش", "مازال", "ماعمري", "عمرني", "دد", "?", "؟", "!"]

# Source 1 (from a website)
print("Fetching stopwords from Source 1...")
url = 'https://granjalasamericas.com/wp-content/plugins/fooevents_pdf_tickets/vendor/ar-php/src/data/ar_stopwords.txt'
response = requests.get(url)
content = response.content.decode('utf-8')
words1 = content.splitlines()
print("Fetched stopwords from Source 1.")

# Source 2 (from a github repository)
print("Reading stopwords from Source 2...")
with open('./RawData/stop.txt', 'r', encoding='utf-8') as file:
    words2 = file.read().splitlines()
print("Read stopwords from Source 2.")

# Source 3 (from a library)
print("Fetching stopwords from Source 3...")
words3 = stp.stopwords_list()
print("Fetched stopwords from Source 3.")

# Source 4 (from a github repository)
print("Reading stopwords from Source 4...")
with open('./RawData/Stop_words.csv', 'r', encoding='utf-16') as file:
    words4 = file.read().splitlines()
print("Read stopwords from Source 4.")

# Source 5 (from doda library)
print("Fetching Darija words from Source 5...")
darija_latin_ref = []
darija_arab_ref = []

darija_object_2_meaning_arab = ['أمل' , 'أميرة' , 'فرح'  , 'حبيبة' , 'جميلة' , 'سعيدة'] 
darija_object_2_meaning_latin = ['amira' , 'amal' , 'farah' ,'habiba' , 'jamila' , 'saida']
double_meaning_words = ['dog' ,'cat' , "donkey" , "lion" , "gazelle" , "calf" , "monkey" , "red" , "black" ,"blue", "brown" , "moon" , "pumpkin" , "heart" , "win" , "lose"   ]
topics = ['animals', 'art', 'clothes', 'colors', 'education', 'environment', 'numbers', 'food', 'humanbody', 'places', 'plants', 'sport', 'time' , 'professions']
for topic in topics:
    my_category = Category('semantic', topic)
    for i in range(1, 5):
        darija_latin_ref.extend(my_category.get_darija_words(spelling=f'n{i}'))
        for word in double_meaning_words:
                darija_object_2_meaning_latin.append(my_category.get_darija_translation(word=word ,   spelling=f'n{i}'))            
                darija_object_2_meaning_arab.append(my_category.get_darija_translation(word=word ,   spelling='darija_ar'))
    darija_arab_ref.extend(my_category.get_darija_words(spelling='darija_ar'))

my_category = Category('semantic', 'family')
for i in range(1, 4):
    darija_latin_ref.extend(my_category.get_darija_words(spelling=f'n{i}'))

darija_arab_ref.extend(my_category.get_darija_words(spelling='darija_ar'))

my_category = CustomCategory('semantic', 'femalenames')
darija_latin_ref.extend(my_category.get_column(column='name'))
darija_arab_ref.extend(my_category.get_column(column='name_darija'))

my_category = CustomCategory('semantic', 'malenames')
darija_latin_ref.extend(my_category.get_column(column='name'))
darija_arab_ref.extend(my_category.get_column(column='darija_name'))

darija_latin_ref = [word for word in darija_latin_ref if word is not None]
print("Fetched Darija words from Source 5.")

# Source 6 (from a github repository)
print("Reading lexicons from Source 6...")  
df = pd.read_csv('./RawData/lexicons.csv', encoding='utf-8')
df = df[df['Type'] == 'neutre']
words6 = df['Token'].tolist()
print("Read lexicons from Source 6.")

# merging all the words
print("Merging all the words...")
unique_words1 = list()
unique_words2 = list()
darija_object_2_meaning_latin = [word.lower() for word in darija_object_2_meaning_latin if word is not None]
darija_object_2_meaning_arab = [word for word in darija_object_2_meaning_arab if word is not None]

negation_terms.extend(darija_object_2_meaning_arab)
for word in words1 + words2 + words3 + words4 + darija_arab_ref + words6:
    if word not in negation_terms:
        unique_words1.append(word)

with open('./Data_prep/stop_words_accum.json', 'w', encoding='utf-8') as file:
    json.dump(list(unique_words1), file, ensure_ascii=False)
print("Saved merged stopwords to stop_words_accum.json.")

for word in darija_latin_ref:
    if word not in darija_object_2_meaning_latin:
        unique_words2.append(word)
        
with open('./Data_prep/darija_latin_ref.json', 'w', encoding='utf-8') as file:
    json.dump(unique_words2, file, ensure_ascii=False)
print("Saved Darija Latin references to darija_latin_ref.json.")

print("Finishhh")
