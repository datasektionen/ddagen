"""import requests
from bs4 import BeautifulSoup

import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:54.0) Gecko/20100101 Firefox/54.0","Connection":"close","Accept-Language":"en-US,en;q=0.5","Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Upgrade-Insecure-Requests":"1"}


def get_count():
    URL = 'https://clicker.dkm.io/pqxawwn'
    page = requests.get(URL, headers=headers, verify = False)

    soup = BeautifulSoup(page.content, 'html.parser')

    count = soup.find(id = "count")
    return count.text


"""




