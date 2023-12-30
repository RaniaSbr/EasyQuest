# yourprojectname/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myApp.urls')),  # Replace 'myApp' with the actual name of your app
    path('', include('myApp.urls')),      # Add this line for the root URL

]



