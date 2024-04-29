from django.urls import path
from . import views

app_name = 'sheets'
urlpatterns = [
    path('adicionar_equipamento/', views.AddEquipmentView.as_view() , name='add_equipment'),
    path('deletar_equipamento/<int:id>', views.DelEquipmentView.as_view(), name='del_equipment'),
    path('equipamentos/', views.ListEquipmentView.as_view(), name='list_equipment'),
    path('editar_equipamento/<int:id>', views.EditEquipmentView.as_view(), name='edit_equipment'),
    path('', views.SheetsView.as_view(), name="homesheets"),
    path('criar/', views.CreateSheetView.as_view(), name="create_sheets"),
    path('criar/<slug:id>', views.CreateSheetInCampaingView.as_view(), name="create_sheetsInCampaign"),
    path('visualizar/', views.ViewSheetView.as_view(), name="view_Sheet"),
    path('deletar_ficha/', views.DeleteSheetView.as_view(), name="delete_sheet")
]