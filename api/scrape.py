import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options


LIST_OF_TERMS = ["gender", "sex", "women",
                 "non-binary", "equal opportunity", "race", "sexual orientation", "disability"]

# old function to get jobs through linkedin

# def get_jobs_linkedin(search_terms):
#     service = Service(executable_path="/chromedriver.exe")
#     options = Options()
#     options.add_argument('window-size=1920x4000')
#     # options.add_argument('headless')
#     driver = webdriver.Chrome(service=service, options=options)

#     URL = "https://www.linkedin.com/jobs/search?keywords="
#     for i in range(len(search_terms)):
#         if (i == 0):
#             URL += search_terms[i]
#         else:
#             URL = URL + "%20" + search_terms[i]

#     driver.get(URL)
#     time.sleep(2)
#     driver.set_window_size(1920, 1080)
#     driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

#     desiredListings = []

#     # collect all the job listings
#     jobs = driver.find_elements(
#         By.CSS_SELECTOR, ".jobs-search__results-list > li")

#     # for each job, check if the description includes a term we want
#     # if it does, add it to the list of desired listings
#     for job in jobs:
#         try:
#             link = job.find_element(By.CLASS_NAME, "base-card__full-link")
#             link.send_keys(Keys.RETURN)
#             time.sleep(0.5)

#             # find the job description
#             jd_element = driver.find_element(
#                 By.CLASS_NAME, "show-more-less-html__markup")

#             # turn the job description to all lowercase letters
#             # makes it easier to search for specific words
#             job_description = jd_element.text.lower()

#             # if the description does not contain any terms that we want, move on
#             if not any(term in job_description for term in LIST_OF_TERMS):
#                 continue

#             job_title = job.find_element(
#                 By.CSS_SELECTOR, ".base-search-card__info .base-search-card__title").text
#             job_link = link.get_attribute("href")
#             job_company = job.find_element(
#                 By.CSS_SELECTOR, ".base-search-card__subtitle").text
#             job_company_image_href = job.find_element(
#                 By.CSS_SELECTOR, ".search-entity-media img").get_attribute("src")
#             job_location = job.find_element(
#                 By.CSS_SELECTOR, ".job-search-card__location").text

#             # create and return a JSON with the title, company, img url, link, and location
#             listingJSON = {
#                 "title": job_title,
#                 "company": job_company,
#                 "img": job_company_image_href,
#                 "link": job_link,
#                 "location": job_location
#             }

#             desiredListings.append(listingJSON)
#         except:
#             print('error')

#     return desiredListings


def get_jobs_indeed(search_terms, page):
    service = Service(executable_path="/chromedriver.exe")
    options = Options()
    driver = webdriver.Chrome(service=service, options=options)

    URL = "https://www.indeed.com/jobs?q="
    for i in range(len(search_terms)):
        if (i == 0):
            URL += search_terms[i]
        else:
            URL = URL + "+" + search_terms[i]
    URL = URL + "&page=" + page

    driver.get(URL)
    driver.maximize_window()

    desiredListings = []

    # collect all the job listings
    jobs = driver.find_elements(
        By.CSS_SELECTOR, ".jobsearch-ResultsList > li")
    # for each job, check if the description includes a term we want
    # if it does, add it to the list of desired listings
    for job in jobs:
        try:
            job.click()
            job_description = driver.find_element(
                By.CSS_SELECTOR, "#jobDescriptionText").text

            # if the description does not contain any terms that we want, move on
            if not any(term in job_description for term in LIST_OF_TERMS):
                continue

            job_title = driver.find_element(
                By.CSS_SELECTOR, ".jobsearch-JobInfoHeader-title").text
            job_link = driver.find_element(
                By.CSS_SELECTOR, ".jobTitle > a").get_attribute("href")
            job_company = driver.find_element(
                By.CSS_SELECTOR, ".jobsearch-InlineCompanyRating-companyHeader > a").text

            job_subtitle = driver.find_element(
                By.CSS_SELECTOR, ".jobsearch-JobInfoHeader-subtitle").text.split("\n")
            job_location = job_subtitle[2] if len(
                job_subtitle) > 2 else job_subtitle[1]

            listingJSON = {
                "title": job_title,
                "company": job_company,
                "link": job_link,
                "location": job_location
            }

            desiredListings.append(listingJSON)
        except Exception as e:
            print(e)

    return desiredListings


def get_default_jobs():
    return get_jobs_indeed(["software", "engineer"], "0")
