from django.contrib import admin
from django.contrib.auth import admin as admin_auth_django

from utilities_app.models import Users

@admin.register(Users)
class UsersAdmin(admin_auth_django.UserAdmin):
  model = Users