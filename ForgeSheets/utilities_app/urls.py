from django.urls import path
from . import views

app_name = 'utilities'
urlpatterns = [
    path('', views.SignView.as_view(), name='sign'),
]
