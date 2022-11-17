import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options


LIST_OF_TERMS = ["gender", "sex", "women", "non-binary"]


def get_jobs(search_terms):
    service = Service(executable_path="/chromedriver.exe")
    options = Options()
    options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    driver = webdriver.Chrome(service=service)
    driver.maximize_window()

    URL = "https://www.linkedin.com/jobs/search?keywords="
    for i in range(len(search_terms)):
        if (i == 0):
            URL += search_terms[i]
        else:
            URL = URL + "%2B" + search_terms[i]

    driver.get(URL)
    time.sleep(0.25)
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(0.25)

    num_listings_collected = 0
    desiredListings = []

    # collect all the job listings
    jobs = driver.find_elements(
        By.CSS_SELECTOR, ".jobs-search__results-list > li")

    # for each job, check if the description includes a term we want
    # if it does, add it to the list of desired listings
    for job in jobs:
        try:
            link = job.find_element(By.CLASS_NAME, "base-card__full-link")
            link.send_keys(Keys.RETURN)
            time.sleep(0.25)

            # find the job description
            jd_element = driver.find_element(
                By.CLASS_NAME, "show-more-less-html__markup")

            # turn the job description to all lowercase letters
            # makes it easier to search for specific words
            job_description = jd_element.text.lower()

            # if the description does not contain any terms that we want, move on
            if not any(term in job_description for term in LIST_OF_TERMS):
                continue

            job_title = job.find_element(
                By.CSS_SELECTOR, ".base-search-card__info .base-search-card__title").text
            job_link = link.get_attribute("href")
            job_company = job.find_element(
                By.CSS_SELECTOR, ".base-search-card__subtitle").text
            job_company_image_href = job.find_element(
                By.CSS_SELECTOR, ".search-entity-media img").get_attribute("src")
            job_location = job.find_element(
                By.CSS_SELECTOR, ".job-search-card__location").text

            listingJSON = {
                "title": job_title,
                "company": job_company,
                "img": job_company_image_href,
                "link": job_link,
                "location": job_location
            }

            desiredListings.append(listingJSON)
        except:
            print('error')

    return desiredListings


def get_default_jobs():
    return get_jobs(["software", "engineer"])
