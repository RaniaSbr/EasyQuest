from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('moderator/', include('moderator.urls')),
    path('article/', include('article.urls')),
    path('myapp/', include('myApp.urls')),
    path('email/', include('email_provider.urls')),
    path('api/', include('UserPart.api.urls')),
]
