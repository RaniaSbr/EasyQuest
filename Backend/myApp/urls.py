# myApp/urls.py

from django.urls import path
from .views import *

urlpatterns = [
    path('upload/', UploadArticlesView.as_view(), name='upload_articles'),
    path('uploadDrive/', UploadArticlesDrive.as_view() , name='upload_drive' ),
]
