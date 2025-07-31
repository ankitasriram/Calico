import requests
from bs4 import BeautifulSoup
import time

# Test basic connection
url = "https://www.thredup.com/women/clothing/dresses"
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
}

session = requests.Session()
session.headers.update(headers)

url = "https://www.thredup.com/women/clothing/dresses"
response = session.get(url)
print(f"Status Code: {response.status_code}")
response = requests.get(url, headers=headers)
print(f"Status Code: {response.status_code}")
print(f"Page title: {BeautifulSoup(response.content, 'html.parser').title.string}")