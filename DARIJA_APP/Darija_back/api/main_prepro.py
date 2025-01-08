from .cleaning_funcs import *
from pyarabic.araby import tokenize
import json
import os





from pyarabic.araby import tokenize
def tokenize_arab_text(text):
            #print(text)
            current_dir = os.path.dirname(os.path.abspath(__file__))
            depend_dir = os.path.join(current_dir, 'depend')

            stop_words_path = os.path.join(depend_dir, 'stop_words_accum.json')
            with open(stop_words_path, 'r', encoding='utf-8') as file:
                stop_words = json.load(file)

            darija_latin_path = os.path.join(depend_dir, 'darija_latin_ref.json')
            with open(darija_latin_path, 'r', encoding='utf-8') as file:
                darija_latin_ref = json.load(file)
          
            #print(text)
            text = remove_url(text)
            text = remove_emails(text)
            text = replace_underscore(text)
            text = remove_html_tags(text)
            text = remove_yt_timers(text)
            text = special_tags_and_ponctuations(text)
            #tokenization
            #print(text)
            words = tokenize(text)
            # print(words)
            words = [ translate_darija_to_arabic(word) for word in words if word not in darija_latin_ref]
            #print(words)
            words = [is_an_emoji(word) for word in words] 
            words = [item for sublist in words for item in sublist if item]
            words = list(set(words))
            #print(words)        
            words = [word for word in words if word not in stop_words]
            #print(words)

            words = [preproc_arab_sentence(word) for word in words]

            # print(words)        
            words = [stemming_darija(word) for word in words if word]
            words = number_remov(words)


            # print(words)
            words = ' '.join(words) 
            return words


if __name__ == "__main__":
    text = "problem"
    print(tokenize_arab_text(text))