# myApp/urls.py

from django.urls import path , include
from .views import  ModViewSet ,ReadModerateur 







urlpatterns = [
   

  
    path('mod/', ModViewSet.as_view({'get': 'list', 'post': 'create'}), name="mod"),
    path('ReadModerateurs/', ReadModerateur.as_view({'get': 'get_mod_list'}), name='moderateurs-list'),

    path('ReadModerateurs/<int:pk>/', ReadModerateur.as_view({'delete': 'destroy'}), name='moderateur-delete'),
   
]



