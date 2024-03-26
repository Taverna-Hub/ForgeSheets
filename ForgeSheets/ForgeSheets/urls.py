from django.contrib import admin
from django.urls import path
from sheets_app import views
from campaigns_app import views
from utilities_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
]
