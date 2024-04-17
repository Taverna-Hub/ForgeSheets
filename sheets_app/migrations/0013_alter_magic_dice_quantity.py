# Generated by Django 5.0.3 on 2024-04-17 19:04

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sheets_app', '0012_magic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='magic',
            name='dice_quantity',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
