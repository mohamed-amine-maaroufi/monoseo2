# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-06-15 21:24
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('monoseo', '0006_auto_20200614_0037'),
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique='true')),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
                ('keyword', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='monoseo.KeyWord')),
            ],
        ),
        migrations.RemoveField(
            model_name='userprofileinfo',
            name='user',
        ),
        migrations.DeleteModel(
            name='UserProfileInfo',
        ),
    ]
