# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-06-19 21:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monoseo', '0010_auto_20200619_1755'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterUniqueTogether(
            name='keyword',
            unique_together=set([('sector', 'project')]),
        ),
    ]
