from django.urls import path
from . import views

app_name = 'sheets'
urlpatterns = [
    path('adicionar_equipamento/', views.AddEquipmentView.as_view() , name='add_equipment'),
    path('deletar_equipamento/<int:id>', views.DelEquipmentView.as_view(), name='del_equipment'),
    path('equipamentos/', views.ListEquipmentView.as_view(), name='list_equipment'),
    path('editar_equipamento/<int:id>', views.EditEquipmentView.as_view(), name='edit_equipment'),
    path('', views.Sheets.as_view(), name="homesheets"),
    path('criar/', views.CreateSheet.as_view(), name="createsheets"),
]
