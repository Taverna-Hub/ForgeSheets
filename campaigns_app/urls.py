from django.urls import path
from . import views

app_name = 'campaigns'
urlpatterns = [
  path('', views.CampaignsView.as_view(), name='campaigns'),
  path('criar/', views.CreateCampaignView.as_view(), name='create_campaign'),
<<<<<<< HEAD
  path('visualizar/<slug:id>/', views.CampaignView.as_view(), name='view_campaign')
=======
  path('visualizar/', views.VisualizeCampaignView.as_view(), name='visualize_campaign'),
  path('visualizar/<slug:id>/racas/', views.ManageRaceOnCampaignView.as_view(), name='races'),
>>>>>>> 73fcb4a5ad4490f6c3717940f8c32ba98594663f
]
