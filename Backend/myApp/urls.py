# myApp/urls.py
from . import views
from django.urls import path , include
from .views import CreateModerator , ModViewSet
from .api_views import SearchAPIView ,IndexUserAPIView





urlpatterns = [
    path('user/', CreateModerator.as_view(), name='CreateModerator'),
    path('api/search/', SearchAPIView.as_view(), name='api-search'),
    path('api/index_users/', IndexUserAPIView.as_view(), name='index_users'),
    path('mod/', ModViewSet.as_view({'get': 'list', 'post': 'create'}), name="mod"),
]



