from pydoda import Category , CustomCategory
from cleaning_funcs import removing_tashkeel

darija_latin_ref =[]
darija_arab_ref = []

topics = ['animals', 'art', 'clothes', 'colors', 'education', 
          'environment', 'numbers', 'food', 'humanbody', 
          'places','plants', 'sport','time']
for topic in topics:
          my_category = Category('semantic', topic)
          print(topic)
          for i in range(1, 5):
                    darija_latin_ref.extend(my_category.get_darija_words(spelling=f'n{i}')) 
                    
          darija_arab_ref.extend(my_category.get_darija_words(spelling='darija_ar'))
          darija_arab_ref = [removing_tashkeel(word) for word in darija_arab_ref]
          
          
my_category = Category('semantic', 'family')
for i in range(1, 4):
                    darija_latin_ref.extend(my_category.get_darija_words(spelling=f'n{i}')) 
                    
darija_arab_ref.extend(my_category.get_darija_words(spelling='darija_ar'))
darija_arab_ref = [removing_tashkeel(word) for word in darija_arab_ref]
          
my_category = CustomCategory('semantic', 'femalenames')
darija_latin_ref.extend(my_category.get_column(column='name'))
darija_arab_ref.extend(my_category.get_column(column='name_darija'))
darija_arab_ref = [removing_tashkeel(word) for word in darija_arab_ref]

my_category = CustomCategory('semantic', 'malenames')
darija_latin_ref.extend(my_category.get_column(column='name'))
darija_arab_ref.extend(my_category.get_column(column='darija_name'))
darija_arab_ref = [removing_tashkeel(word) for word in darija_arab_ref]

print(darija_latin_ref)