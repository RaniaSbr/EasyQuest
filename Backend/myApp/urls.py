# myApp/urls.py

from django.urls import path
from .views import ModViewSet, ModerateurManager

urlpatterns = [
    # Other URL patterns...

    path('mod/', ModViewSet.as_view({'get': 'list', 'post': 'create'}), name="mod"),
    path('ModerateurManager/', ModerateurManager.as_view({'get': 'get_mod_list'}), name='moderateurs-list'),
    path('ModerateurManager/<int:pk>/', ModerateurManager.as_view({'delete': 'destroy'}), name='moderateur-detail'),
    path('ModerateurManager/show-password/<int:pk>/', ModerateurManager.as_view({'get': 'show_passwords'}), name='moderateur-show-password'),
    path('ModerateurManager/update/<int:pk>/', ModerateurManager.as_view({'put': 'update'}), name='moderateur-update'),
]
