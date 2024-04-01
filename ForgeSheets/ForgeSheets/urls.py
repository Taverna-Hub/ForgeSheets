from django.contrib import admin
from django.urls import path, include
from sheets_app import views
from campaigns_app import views
from utilities_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('utilities_app.urls')),
<<<<<<< HEAD
    path('sheets/', include('sheets_app.urls'))
=======
    path('sheets/', include('sheets_app.urls')),
    path('campaign/', include('campaigns_app.urls')),
>>>>>>> db8320e5037600371a381a02fd60f57416ef870c
]
