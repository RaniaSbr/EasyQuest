# myApp/urls.py
from django.urls import path , include
from .views import YourModelListCreateView

urlpatterns = [
    path('yourmodel/', YourModelListCreateView.as_view(), name='yourmodel-list-create'),

]

