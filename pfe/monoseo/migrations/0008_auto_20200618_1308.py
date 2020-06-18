# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-06-18 12:08
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('monoseo', '0007_auto_20200615_2224'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='project',
            unique_together=set([('name', 'type', 'user')]),
        ),
    ]
