# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from monoseo.forms import UserForm
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Project, KeyWord
from django.db import IntegrityError
from django.shortcuts import (get_object_or_404,
                              render,
                              HttpResponseRedirect)
import requests
from bs4 import BeautifulSoup
import re
import sys

reload(sys)
sys.setdefaultencoding('utf8')

@login_required(login_url='loginuser/')
def index(request):
	projects = Project.objects.all()
	keywords = KeyWord.objects.all()
	return render(request, 'index.html', {'projects' : projects, 'keywords' : keywords})


@login_required
def special(request):
    return HttpResponse("You are logged in !")

@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))

def register(request):
    registered = False
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            messages.success(request, "Thank for your registration")
            registered = True
    else:
        form = UserForm()
    return render(request, 'register.html',
                  {'user_form': form,
                   'registered': registered})

def loginuser(request):
    if request.method == "POST":
        uname = request.POST.get('username','')
        upass = request.POST.get('password','')
        print(uname, upass)
        user = authenticate(request, username=uname, password=upass)
        if user:
            if user.is_active:
                login(request, user)
                return redirect('index')
            else:
                messages.error(request, 'Your account is not active, contact the admin !')
                return redirect('loginuser')
        else:
            messages.error(request, 'Invalid login details given')
            return redirect('loginuser')
    return render(request, 'login.html')




@login_required(login_url='/loginuser/')
def projets(request):
    projects = Project.objects.filter(user=request.user)
    return render(request, 'projects.html', {'projects' : projects})

@login_required(login_url='/loginuser/')
def keywords(request,id):

    p = Project.objects.get(id=id)
    keywords = KeyWord.objects.filter(project=p)
    return render(request, 'keywords.html', {'keywords' : keywords, 'project': p })



def rapport(request):

    return "hello"


def createproject(request):
    if request.method == "POST":
        name = request.POST.get('name','')
        type= request.POST.get('type','')
        p = Project()
        p.name = name
        p.type = type
        p.user = request.user
        try:
            p.save()
            messages.success(request, 'Project created with success !!!')
            return redirect('projets')
        except IntegrityError as e:
            messages.error(request, 'you should enter a different name for this type')
            return redirect('createproject')

    return render(request, 'createproject.html')

def addquickwork(request,id):

    project = Project.objects.get(id=id)
    if request.method == "POST":
        word = request.POST.get('key','')
        domain= request.POST.get('domain','')
        sector = request.POST.get('sector','')
        project = Project.objects.get(id=id)

        k = KeyWord()
        k.key = word
        k.domain = domain
        k.sector = sector
        k.project = project

        try:
            k.save()
            messages.success(request, 'Key word created with success !!!')
            return redirect('/keywords/'+ str(id))
        except IntegrityError as e:
            messages.error(request, 'you should enter a different key word, it\'s already exist.')
            return redirect('/addquickwork/'+ str(id))

    return render(request, 'addkeyword.html', {'project': project})


def deleteproject(request,id):

    # fetch the object related to passed id
    obj = get_object_or_404(Project, id=id)

    if request.method == "POST":
        # delete object
        obj.delete()
        # after deleting redirect to
        messages.success(request, 'Project deleted with success !!!')
        return HttpResponseRedirect("/projets")

    return render(request, "projects.html")

def deletekeyword(request,id):


    # fetch the object related to passed id
    obj = get_object_or_404(KeyWord, id=id)

    if request.method == "POST":
        # delete object
        obj.delete()
        # after deleting redirect to
        messages.success(request, 'KeyWord deleted with success !!!')
        return HttpResponseRedirect("/projets")

    return render(request, "projects.html")


#################################################################################
################## scrapping functions ##########################################

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


def scrape_page_data(url):
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
    pp.pprint(metadata)
    return metadata


"""links = ["https://en.wikipedia.org/wiki/%22Hello,_World!%22_program",
         "https://hackersandslackers.com/scraping-urls-with-beautifulsoup/",
         "https://www.planet.com/",
         ]
i = 0
"""





def analyse(links):

    """links = ["https://en.wikipedia.org/wiki/%22Hello,_World!%22_program",
             "https://hackersandslackers.com/scraping-urls-with-beautifulsoup/",
             "https://www.planet.com/",
             "https://www.helloworld.com.au",
             "https://openclassrooms.com/fr/courses/235344-apprenez-a-programmer-en-python/232273-utilisez-des-dictionnaires"
             ]"""
    list_links = ['link1','link2','link3','link4','link5']
    scrappe_data = []
    i=0;
    for url in links:
        print("*" * 50)
        i = i + 1
        print(i)
        scrappe_data.append(scrape_page_data(url))

    result = dict(zip(list_links, scrappe_data))
    # return HttpResponse(soup)
    return result

######################### end scrapping functions #######################


################## function search #####################################
@login_required(login_url='/loginuser/')
def searchkeyword(request):
    projects = Project.objects.filter(user=request.user)


    if request.method == "POST":
        word = request.POST.get('keyword', '')
        domain = request.POST.get('domain', '')
        sector = request.POST.get('sector', '')
        id_project = request.POST.get('id_project', '')
        project = Project.objects.get(id=id_project)

        k = KeyWord()
        k.key = word
        k.domain = domain
        k.sector = sector
        k.project = project

        try:
            k.save()
            messages.success(request, 'Key word was saved with success !!!')

            try:
                from googlesearch import search

                print("*" * 80)
                print("result google")
                links = []
                query = word + " " + sector
                for j in search(query, tld=domain, num=10, stop=10, pause=2):
                    print(j)
                    links.append(j)

                print("*" * 80)

                messages.success(request, 'The result of search finish with success')

            except ImportError:
                print("No module named 'google' found")
                messages.error(request, 'There is some problem with google search library !!!')
            resofscrapping = analyse(links)
            return render(request, "analyse.html", {"result": resofscrapping, "project": project})

        except IntegrityError as e:
            messages.error(request, 'Key word, it\'s already exist, this is the new result for its search')
            try:
                from googlesearch import search

                print("*" * 80)
                print("result google")
                links = []
                query = word + " " + sector

                for j in search(query, tld=domain, num=5, stop=5, pause=2):
                    print(j)
                    links.append(j)
                print("*" * 80)

                messages.success(request, 'The result of search finish with success')

            except ImportError:
                print("No module named 'google' found")
                messages.error(request, 'There is some problem with google search library !!!')

            """return render(request, 'search.html',
                          {'result': result,  'keyword': word, 'domain': domain,
                           'sector': sector,'projects': projects})"""
            resofscrapping = analyse(links)
            return render(request, "analyse.html", {"result": resofscrapping,'project': project})


    return render(request, 'search.html', {'projects': projects})

