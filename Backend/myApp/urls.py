# myApp/urls.py
from . import views
from django.urls import path , include
from .views import CreateModerator , ModViewSet ,ReadModerateur ,DeleteModerateur
from .api_views import SearchAPIView ,IndexUserAPIView





urlpatterns = [
    path('user/', CreateModerator.as_view(), name='CreateModerator'),
    path('api/search/', SearchAPIView.as_view(), name='api-search'),
    path('api/index_users/', IndexUserAPIView.as_view(), name='index_users'),
    path('mod/', ModViewSet.as_view({'get': 'list', 'post': 'create'}), name="mod"),
    path('ReadModerateurs/', ReadModerateur.as_view({'get': 'get_mod_list'}), name='moderateurs-list'),
    path('DeleteModerateurs/<int:pk>/', DeleteModerateur.as_view({'delete': 'destroy'}), name='delete moderator'),
    path('delete/<int:mod_id>/', views.delete_mod, name='delete_user'),
]



