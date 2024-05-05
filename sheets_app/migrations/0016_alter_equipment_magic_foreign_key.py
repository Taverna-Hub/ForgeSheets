import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sheets_app', '0015_sheet_uuid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sheet',
            name='id',
        ),
        migrations.AlterField(
            model_name='sheet',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='equipment',
            name='sheet_id',
            field=models.ForeignKey(to='sheets_app.sheet', on_delete=models.CASCADE),
        ),
        migrations.AlterField(
            model_name='magic',
            name='sheet_id',
            field=models.ForeignKey(to='sheets_app.sheet', on_delete=models.CASCADE),
        ),
    ]
