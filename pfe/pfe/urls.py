"""pfe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from monoseo import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^register/$',views.register,name='register'),
    url(r'^loginuser/$',views.loginuser,name='loginuser'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^createproject/$', views.createproject, name='createproject'),
    url(r'^projets/$', views.projets, name='projets'),
    url(r'^rapport/$', views.rapport, name='rapport'),
    url(r'^search/$', views.searchkeyword, name='search'),
    url(r'^analyse/$', views.analyse, name='analyse'),
    url(r'^addquickwork/(?P<id>[0-9]+)$', views.addquickwork, name='addquickwork'),
    url(r'^keywords/(?P<id>[0-9]+)$', views.keywords, name='keywords'),
    url(r'^deleteproject/(?P<id>[0-9]+)$', views.deleteproject, name='deleteproject'),
    url(r'^deletekeyword/(?P<id>[0-9]+)$', views.deletekeyword, name='deletekeyword'),
]
