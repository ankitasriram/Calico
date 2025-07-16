import requests
from bs4 import BeautifulSoup

# Target Vinted category (e.g., women's dresses)
url = "https://www.vinted.com/women/clothes/dresses"

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
}

# Start a session with headers
session = requests.Session()
session.headers.update(headers)

# Send the request
response = session.get(url)
print(f"Status Code: {response.status_code}")

# Parse the response
soup = BeautifulSoup(response.content, 'html.parser')
title = soup.title.string if soup.title else "No title found"
print(f"Page title: {title}")
