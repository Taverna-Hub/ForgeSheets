from django.contrib import admin
from django.urls import path, include
from sheets_app import views
from campaigns_app import views
from utilities_app import views

urlpatterns = [
    path('tavernadmin/', admin.site.urls),
    path('', include('utilities_app.urls')),
    path('fichas/', include('sheets_app.urls')),
    path('campanhas/', include('campaigns_app.urls')),
]
