"""Scrape metadata from target URL."""
# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
import pprint
import re
import sys
reload(sys)
sys.setdefaultencoding('utf8')

def get_title(html):
    """Scrape page title."""
    title = None
    if html.title:
        title = html.title.get_text()
    elif html.find("meta", property="og:title"):
        title = html.find("meta", property="og:title").get('content')
    elif html.find("meta", property="twitter:title"):
        title = html.find("meta", property="twitter:title").get('content')
    elif html.find("h1"):
        title = html.find("h1").get_text()
    else:
        title = None
    return title


def get_description(html):
    """Scrape page description."""
    description = None
    if html.find("meta", property="description"):
        description = html.find("meta", property="description").get('content')
    elif html.find("meta", property="og:description"):
        description = html.find("meta", property="og:description").get('content')
    elif html.find("meta", property="twitter:description"):
        description = html.find("meta", property="twitter:description").get('content')
    elif html.find("p"):
        description = html.find("p").contents
    return description


def get_image(html):
    """Scrape share image."""
    image = []
    if html.find("meta", property="image"):
        image.append(html.find("meta", property="image").get('content'))
    elif html.find("meta", property="og:image"):
        image.append(html.find("meta", property="og:image").get('content'))
    elif html.find("meta", property="twitter:image"):
        image.append(html.find("meta", property="twitter:image").get('content'))
    elif html.find_all("img", src=True):
        image = html.find_all("img")
        if image:
            image = html.find_all("img")[0].get('src')

    return image


def get_all_images(html):
    """Scrape share image."""
    image = []
    imagespng = html.find_all('img', {'src': re.compile('.png')})
    imagesjepg = html.find_all('img', {'src': re.compile('.jepg')})
    imagesjpg = html.find_all('img', {'src': re.compile('.jpg')})
    for img in imagespng:
        image.append(img['src'])
    for img in imagesjepg:
        image.append(img['src'])
    for img in imagesjpg:
        image.append(img['src'])

    return image


def get_logo(html):
    """Scrape share image."""
    logo = None
    if html.find("img", class_="logo"):
        text = html.find("img", class_="logo")

    return logo


def get_site_name(html, url):
    """Scrape site name."""
    site_name = None
    if html.find("meta", property="og:site_name"):
        site_name = html.find("meta", property="og:site_name").get('content')
    elif html.find("meta", property='twitter:title'):
        site_name = html.find("meta", property="twitter:title").get('content')
    else:
        site_name = url.split('//')[1]
        return site_name.split('/')[0].rsplit('.')[1].capitalize()
    return site_name


def get_footer(html):
    """Scrape site name."""
    text = None

    if html.find("div", class_="footer"):
        text = html.find("div", class_="footer")
    elif html.find("div", class_="page-footer"):
        text = html.find("div", class_="page-footer")
    elif html.find("div", class_="section-footer"):
        text = html.find("div", class_="section-footer")
    elif html.find("footer", class_="footer"):
        text = html.find("footer", class_="footer")
    elif html.find("footer", class_="page-footer"):
        text = html.find("footer", class_="page-footer")
    elif html.find("footer", class_="section-footer"):
        text = html.find("footer", class_="section-footer")
    elif html.find("footer"):
        text = html.footer.get_text().encode('utf-8').strip()

    return text


def get_favicon(html, url):
    """Scrape favicon."""
    if html.find("link", attrs={"rel": "icon"}):
        favicon = html.find("link", attrs={"rel": "icon"}).get('href')
    elif html.find("link", attrs={"rel": "shortcut icon"}):
        favicon = html.find("link", attrs={"rel": "shortcut icon"}).get('href')
    else:
        favicon = "empty favicon"
    return favicon


def get_theme_color(html):
    """Scrape brand color."""
    if html.find("meta", property="theme-color"):
        color = html.find("meta", property="theme-color").get('content')
        return color
    return None


def scrape_page_metadata(url):
    """Scrape target URL for metadata."""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }
    pp = pprint.PrettyPrinter(indent=4)
    r = requests.get(url, headers=headers)
    html = BeautifulSoup(r.content, 'html.parser')
    metadata = {
        'title': get_title(html),
        'description': get_description(html),
        'metaimage': get_image(html),
        'allimages': get_all_images(html),
        'favicon': get_favicon(html, url),
        'sitename': get_site_name(html, url),
        'footer': get_footer(html),
        'color': get_theme_color(html),
        'logo': get_logo(html),
        'url': url
    }
    #pp.pprint(metadata)
    return metadata


links = ["https://en.wikipedia.org/wiki/%22Hello,_World!%22_program",
             "https://hackersandslackers.com/scraping-urls-with-beautifulsoup/",
             "https://www.planet.com/",
             "https://www.helloworld.com.au",
             "https://openclassrooms.com/fr/courses/235344-apprenez-a-programmer-en-python/232273-utilisez-des-dictionnaires"
             ]

list_links = ['link1','link2','link3','link4','link5']
scrappe_data = []
i=0;
for url in links:
    print("*" * 50)
    i = i + 1
    print(i)
    scrappe_data.append(scrape_page_metadata(url))

result = dict(zip(list_links, scrappe_data))

print (result)