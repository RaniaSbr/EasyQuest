from django.urls import path, include
from .views import *
urlpatterns = [
    path('email/', generate_pdf_and_send_email, name='email'),
]
