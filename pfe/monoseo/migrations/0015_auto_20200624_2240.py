# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-06-24 21:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monoseo', '0014_auto_20200624_2218'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]