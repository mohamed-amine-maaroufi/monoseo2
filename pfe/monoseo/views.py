# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from monoseo.forms import UserForm,UserProfileInfoForm
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

#@login_required(login_url='loginuser/')
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
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileInfoForm(data=request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            registered = True
        else:
            print(user_form.errors,profile_form.errors)
    else:
        user_form = UserForm()
        profile_form = UserProfileInfoForm()
    return render(request,'register.html',
                          {'user_form':user_form,
                           'profile_form':profile_form,
                           'registered':registered})

def loginuser(request):
    if request.method == "POST":
        uname = request.POST.get('username','')
        upass = request.POST.get('password','')
        print(uname, upass)
        user = authenticate(request, username=uname, password=upass)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.error(request, 'Invalid login details given')
            return redirect('loginuser')
    return render(request, 'login.html')





def projets(request):
    projects = Project.objects.filter(user=request.user)
    return render(request, 'projects.html', {'projects' : projects})


def keywords(request,id):

    p = Project.objects.get(id=id)
    keywords = KeyWord.objects.filter(project=p)
    return render(request, 'keywords.html', {'keywords' : keywords, 'project': p })



def rapport(request):

    return "hello"


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
                result = []
                query = word + " " + sector
                for j in search(query, tld=domain, num=10, stop=10, pause=2):
                    print(j)
                    result.append(j)

                print("*" * 80)

                messages.success(request, 'The result of search finish with success')

            except ImportError:
                print("No module named 'google' found")
                messages.error(request, 'There is some problem with google search library !!!')

            return render(request, 'search.html',
                          {'result': result, 'keyword': word, 'domain': domain,
                           'sector': sector, 'projects': projects})

        except IntegrityError as e:
            messages.error(request, 'Key word, it\'s already exist, this is the new result for its search')
            try:
                from googlesearch import search

                print("*" * 80)
                print("result google")
                result = []
                query = word + " " + sector

                for j in search(query, tld=domain, num=5, stop=5, pause=2):
                    print(j)
                    result.append(j)
                print("*" * 80)

                messages.success(request, 'The result of search finish with success')

            except ImportError:
                print("No module named 'google' found")
                messages.error(request, 'There is some problem with google search library !!!')

            return render(request, 'search.html',
                          {'result': result,  'keyword': word, 'domain': domain,
                           'sector': sector,'projects': projects})


    return render(request, 'search.html', {'projects': projects})


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


def getcpr(code):
    copyrightTexts = ""
    copyrightTexts = code(text=re.compile('copy'))
    if copyrightTexts != "":
        copyrightTexts = code(text=re.compile('©'))
    elif copyrightTexts != "":
        copyrightTexts = code(text=re.compile('& copy '))
    else:
        copyrightTexts = copyrightTexts
    print(copyrightTexts )
    return copyrightTexts



def geturls(code):
    tags = code.find_all("a")
    l = []
    x = ''
    for i in tags:
        try:
            x = i['href']
        except KeyError:
            x ='none'
        if  x.startswith('http'
                         ''):
            l.append(x)
    return l


def getimages(code):
    tags = code.find_all("img")
    l = []
    x = ''
    for i in tags:
        try:
            x = i['src']
        except KeyError:
            x ='none'
        #if  (x.startswith('http') and( x.endswith('.png') or  x.endswith('.jpg')  or x.endswith('.jpeg'))) :
        if  (x.startswith('http') and(  ('.png' in x) or  ('.jpg' in x) or ('.jpeg' in x))) :
            l.append(x)
    return l

def getps(code):
    tags = code.find_all("p")
    tags = code.find_all("h1")
    l = []
    x = ''
    for i in tags:
        l.append(i)
    return l


def is_meta_description(tag):
    try:
        return tag.name == 'meta' and tag['name'] == 'description'
    except KeyError:
        return 'val'

def getdescription(code):
    meta_tag = code.find('meta', attrs={'name': 'description'})
    print(meta_tag)
    try:
        content = meta_tag['content']
    except TypeError:
        content = "no desc"
    return content

def getvideos(code):

    tags = code.find_all("video")
    l = []
    x = ''
    for i in tags:
        try:
            x = i['src']
        except KeyError:
            x ='none'
        #if  (x.startswith('http') and( x.endswith('.png') or  x.endswith('.jpg')  or x.endswith('.jpeg'))) :
        if  (x.startswith('http') and(  ('.mp4' in x) or  ('.avi' in x) )) :
            l.append(x)
    return l


def analyse(request):
    res = {}
    urldetected = request.GET.get('link', '')
    link = "https://www.planetsports.asia/"

    print("***************")
    print("urldetected")
    print(urldetected)
    print("link")
    print(link)

    page = requests.get(link)
    soup = BeautifulSoup(page.content, 'html.parser')
    c1 = geturls(soup)
    c2 = getimages(soup)
    c3 = getps(soup)
    c4 = getdescription(soup)
    c5 = getvideos(soup)
    c6 = getcpr(soup)

    res.update({"urls": c1})
    res.update({"images": c2})
    res.update({"ps": c3})
    res.update({"description": c4})
    res.update({"videos": c5})
    res.update({"copy": c6})

    # return HttpResponse(soup)
    return render(request, "analyse.html", {"res": res, 'site': link})