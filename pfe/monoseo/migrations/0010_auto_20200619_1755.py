# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-06-19 16:55
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('monoseo', '0009_auto_20200618_1311'),
    ]

    operations = [
        migrations.RenameField(
            model_name='report',
            old_name='date_created',
            new_name='date_created_report',
        ),
        migrations.AlterUniqueTogether(
            name='project',
            unique_together=set([('name', 'type')]),
        ),
    ]
