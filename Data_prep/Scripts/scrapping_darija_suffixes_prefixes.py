import requests
from bs4 import BeautifulSoup
import json
from cleaning_funcs import translate_darija

DARIJA_PREFIXES = []
DARIJA_SUFFIXES = []


def scraper(url , index):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        first_table = soup.find('table')
        var = 1
#         print(first_table)

        for row in first_table.find_all('tr'):
                    for cell in row.find_all('td'):
                              # print(cell.get_text())
                              if index == 0 :
                                        if var == 3:
                                                  tmp_list = cell.get_text().split('…')
                                                  # print(tmp_list)
                                                  DARIJA_SUFFIXES.append(tmp_list[1].strip())
                                                  DARIJA_PREFIXES.append(tmp_list[0].strip())
                                        var += 1
                              elif index == 1 :
                                        if var == 3:
                                                  tmp_list = cell.get_text()
                                                  # print(tmp_list)
                                                  if tmp_list[0] == '-':
                                                            tmp_list = tmp_list[1:]
                                                  if tmp_list == '–':
                                                            tmp_list = ''
                                                  DARIJA_SUFFIXES.append(tmp_list)
                                        var += 1
                              elif index == 2:
                                        if var == 3:
                                                  tmp_list = cell.get_text().split()
                                                  # print(tmp_list)
                                                  if len(tmp_list) == 3:
                                                            # print(tmp_list[1]) 
                                                            # DARIJA_SUFFIXES.append(tmp_list[1].strip())
                                                            DARIJA_PREFIXES.append(tmp_list[1].strip())
                                                  if len(tmp_list) == 4:
                                                            DARIJA_SUFFIXES.append(tmp_list[3].strip())
                                                            DARIJA_PREFIXES.append(tmp_list[1].strip())
                                                  if len(tmp_list) == 7:
                                                            DARIJA_PREFIXES.append(tmp_list[1].strip())  
                                                            DARIJA_PREFIXES.append(tmp_list[5].strip()) 
                                                  if len(tmp_list) == 9:
                                                            DARIJA_PREFIXES.append(tmp_list[1].strip())  
                                                            DARIJA_PREFIXES.append(tmp_list[6].strip()) 
                                                            DARIJA_SUFFIXES.append(tmp_list[3].strip())
                                                            DARIJA_SUFFIXES.append(tmp_list[8].strip())                                                                                     
                                        var += 1
                    var = 1       
    else:
        print(response.status_code)

URL = [ 'https://tajinequiparle.com/en/moroccan-arabic-grammar/present-tense/', 'https://tajinequiparle.com/en/moroccan-arabic-grammar/past-tense/' ,'https://tajinequiparle.com/en/moroccan-arabic-grammar/future-tense/' ]

for i in range(0, len(URL)):
          scraper(URL[i], i)

# scraper(URL)
DARIJA_PREFIXES = list(set(filter(None, DARIJA_PREFIXES)))
# print(DARIJA_PREFIXES)
DARIJA_SUFFIXES = list(set(filter(None, DARIJA_SUFFIXES)))
print(DARIJA_SUFFIXES)
DARIJA_PREFIXES = [translate_darija(word) for word in DARIJA_PREFIXES]
DARIJA_SUFFIXES = [translate_darija(word) for word in DARIJA_SUFFIXES]
# print(DARIJA_PREFIXES)
print(DARIJA_SUFFIXES)

data = {
    'darija_prefixes': DARIJA_PREFIXES,
    'darija_suffixes': DARIJA_SUFFIXES
}

file = './Data_prep/suf_pref_darija.json'

with open(file, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)
