# myApp/urls.py
<<<<<<< HEAD

from django.urls import path
from .views import *

urlpatterns = [
    path('upload/', UploadArticlesView.as_view(), name='upload_articles'),
]
=======
from django.urls import path , include
from .views import YourModelListCreateView

urlpatterns = [
    path('yourmodel/', YourModelListCreateView.as_view(), name='yourmodel-list-create'),

]

>>>>>>> MAHRAZABDELRAHMEN
