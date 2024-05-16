from django.urls import path
from . import views

app_name = 'campaigns'
urlpatterns = [
  path('', views.CampaignsView.as_view(), name='campaigns'),
  path('criar/', views.CreateCampaignView.as_view(), name='create_campaign'),
  path('visualizar/<slug:id>/', views.CampaignView.as_view(), name='view_campaign')
]
