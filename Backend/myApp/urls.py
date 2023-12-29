# myApp/urls.py
from django.urls import path , include
from .views import UserListCreateView
from .api_views import SearchAPIView ,IndexUserAPIView

urlpatterns = [
    path('user/', UserListCreateView.as_view(), name='User-list-create'),
    path('api/search/', SearchAPIView.as_view(), name='api-search'),
    path('api/index_users/', IndexUserAPIView.as_view(), name='index_users'),
]



