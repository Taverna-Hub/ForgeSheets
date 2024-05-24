import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ForgeSheets.settings')  
django.setup()

from utilities_app.models import Users


Users.objects.all().delete()
print("Todos os usuários foram deletados.")