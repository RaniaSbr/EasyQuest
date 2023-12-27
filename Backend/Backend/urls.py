from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('moderator/', include('moderator.urls')),
    path('article/', include('article.urls')),
<<<<<<< HEAD
    path('myapp/', include('myApp.urls')),
    path('email/', include('email_provider.urls')),
=======
>>>>>>> MAHRAZABDELRAHMEN
]
