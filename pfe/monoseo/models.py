# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


from django.db import models
from django.contrib.auth.models import User
# Create your models here.


#model list of project
class Project(models.Model):
    name = models.CharField(max_length=100, unique='true')
    type = models.CharField(max_length=100, default="")
    date_created = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('name','type')


#model list of searched keywords
class KeyWord(models.Model):
    key = models.CharField(max_length=100)
    domain = models.CharField(max_length=100)
    sector = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.key

    class Meta:
        unique_together = (('key', 'domain'), ('sector', 'project'))


#model list of rapport
class Report(models.Model):
    name = models.CharField(max_length=100, unique='true')
    date_created = models.DateTimeField(default=timezone.now)
    keyword = models.ForeignKey(KeyWord, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name