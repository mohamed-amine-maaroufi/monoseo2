# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-06-24 18:41
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('monoseo', '0011_auto_20200619_2205'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='report',
            unique_together=set([('name', 'keyword')]),
        ),
    ]