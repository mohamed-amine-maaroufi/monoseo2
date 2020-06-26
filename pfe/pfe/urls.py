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
from django.contrib.auth.views import PasswordChangeView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^register/$',views.register,name='register'),
    url(r'^loginuser/$',views.loginuser,name='loginuser'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^updateprofilinfo/$', views.updateprofilinfo, name='updateprofilinfo'),
    url(r'^createproject/$', views.createproject, name='createproject'),
    url(r'^projets/$', views.projets, name='projets'),
    url(r'^reports/$', views.reports, name='reports'),
    url(r'^search/$', views.searchkeyword, name='search'),
    url(r'^createreport/$', views.createreport, name='createreport'),
    url(r'^pdf_view/(?P<name_pdf>.*)$', views.pdf_view, name='pdf_view'),
    #url(r'^analyse/$', views.analyse, name='analyse'),
    url(r'^addquickwork/(?P<id>[0-9]+)$', views.addquickwork, name='addquickwork'),
    url(r'^keywords/(?P<id>[0-9]+)$', views.keywords, name='keywords'),
    url(r'^getkeywords/(?P<id>[0-9]+)$', views.getkeywords, name='getkeywords'),
    url(r'^getreports/(?P<id>[0-9]+)$', views.getreports, name='getreports'),
    url(r'^fillsector_domain/(?P<idproject>[0-9]+)/(?P<idkeyword>[0-9]+)$', views.fillsector_domain, name='fillsector_domain'),
    url(r'^deleteproject/(?P<id>[0-9]+)$', views.deleteproject, name='deleteproject'),
    url(r'^deletekeyword/(?P<id>[0-9]+)$', views.deletekeyword, name='deletekeyword'),
    url(r'^deletereport/(?P<id>[0-9]+)$', views.deletereport, name='deletereport'),
]
