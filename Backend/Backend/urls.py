from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('moderator/', include('moderator.urls')),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    path('article/', include('article.urls')),
    path('myapp/', include('myApp.urls')),
=======
>>>>>>> a1106402 (added Moderator app  and relevant api change)
=======
    path('article/', include('article.urls')),
    path('myapp/', include('myApp.urls')),
    path('email/', include('email_provider.urls')),
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)
]
    
=======
    path('article/', include('article.urls')),
]
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
