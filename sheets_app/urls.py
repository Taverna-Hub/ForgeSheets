from django.urls import path
from . import views

app_name = 'sheets'
urlpatterns = [
    path('', views.SheetsView.as_view(), name="homesheets"),
    path('criar/', views.CreateSheetView.as_view(), name="create_sheets"),
    path('criar/<slug:id>/', views.CreateSheetInCampaingView.as_view(), name="create_sheetsInCampaign"),
    path('visualizar/<slug:id>/', views.EditSheetView.as_view(), name="edit_sheet"),
    path('deletar_ficha/<slug:id>/', views.DeleteSheetView.as_view(), name="delete_sheet"),
    path('deletar_equipamento/<slug:id>', views.DelEquipmentView.as_view(), name="delete_equipment"),
    path('editar_equipamento/<slug:id>', views.EditEquipmentView.as_view(), name="edit_equipment"),
    path('deletar_magia/<slug:id>', views.DeleteMagicView.as_view(), name="delete_magic"),
    path('editar_magia/<slug:id>', views.EditMagicView.as_view(), name="edit_magic")
]