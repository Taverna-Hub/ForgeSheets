# Generated by Django 5.0.3 on 2024-05-05 18:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sheets_app', '0023_remove_magic_id_alter_magic_uuid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='magic',
            old_name='uuid',
            new_name='id',
        ),
    ]