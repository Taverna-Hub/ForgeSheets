# Generated by Django 5.0.3 on 2024-05-05 18:44

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sheets_app', '0018_rename_uuid_sheet_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipment',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, unique=True),
        ),
    ]