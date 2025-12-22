from playwright.sync_api import sync_playwright
import time

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})
        page.goto('http://localhost:8000')
        page.wait_for_load_state('networkidle')
        time.sleep(2) # a small delay to be sure
        page.screenshot(path='/app/verification.png', full_page=True)
        browser.close()

if __name__ == '__main__':
    verify_frontend()
