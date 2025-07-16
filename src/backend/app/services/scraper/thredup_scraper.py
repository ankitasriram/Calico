import requests
from bs4 import BeautifulSoup
import time

# Test basic connection
url = "https://www.thredup.com/women/clothing/dresses"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

response = requests.get(url, headers=headers)
print(f"Status Code: {response.status_code}")
print(f"Page title: {BeautifulSoup(response.content, 'html.parser').title.string}")