from django.urls import path
from . import views

app_name = 'sheets'
urlpatterns = [
    path('', views.SheetsView.as_view(), name="homesheets"),
    path('criar/', views.CreateSheetView.as_view(), name="create_sheets"),
    path('criar/<slug:id>', views.CreateSheetInCampaingView.as_view(), name="create_sheetsInCampaign"),
    path('visualizar/', views.ViewSheetView.as_view(), name="view_Sheet"),
    path('deletar_ficha/', views.DeleteSheetView.as_view(), name="delete_sheet")
]