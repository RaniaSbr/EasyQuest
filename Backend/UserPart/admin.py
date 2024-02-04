from django.contrib import admin

# Register your models here.
from .models import UserProfile
from article.models import Article ,MetaData
admin.site.register(UserProfile)
admin.site.register(Article)
admin.site.register(MetaData)

