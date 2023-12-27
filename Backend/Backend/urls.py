from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('moderator/', include('moderator.urls')),
<<<<<<< HEAD
<<<<<<< HEAD
    path('article/', include('article.urls')),
    path('myapp/', include('myApp.urls')),
=======
>>>>>>> a1106402 (added Moderator app  and relevant api change)
]
    
=======
    path('article/', include('article.urls')),
]
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
