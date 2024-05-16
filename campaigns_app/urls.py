from django.urls import path
from . import views

app_name = 'campaigns'
urlpatterns = [
  path('', views.CampaignView.as_view(), name='campaign'),
  path('criar/', views.CreateCampaignView.as_view(), name='create_campaign'),
  path('visualizar/', views.VisualizeCampaignView.as_view(), name='visualize_campaign'),
  path('visualizar/<slug:id>/racas/', views.ManageRaceOnCampaignView.as_view(), name='races'),
]
