# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Project, KeyWord, Report

# Register your models here.

admin.site.register(Project)
admin.site.register(KeyWord)
admin.site.register(Report)