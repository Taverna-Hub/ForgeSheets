# Generated by Django 5.0.3 on 2024-04-04 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sheets_app', '0005_alter_sheet_expmax'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sheet',
            name='image',
            field=models.URLField(null=True),
        ),
    ]
