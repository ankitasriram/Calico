from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

# Set up headless Chrome (browser runs in background)
options = Options()
options.headless = True  # Remove if you want to see the browser

driver = webdriver.Chrome(options=options)

try:
    url = "https://www.vinted.com/catalog?search_text=robes"
    driver.get(url)

    # Wait for content to load (better to use WebDriverWait for real projects)
    time.sleep(5)

    # Example: Find all product titles on the page
    items = driver.find_elements(By.CSS_SELECTOR, "a.feed-grid__item")
    for item in items:
        title = item.get_attribute("title")
        href = item.get_attribute("href")
        print(f"Product: {title} - URL: {href}")

finally:
    driver.quit()
