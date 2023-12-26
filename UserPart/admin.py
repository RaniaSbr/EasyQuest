from django.contrib import admin

# Register your models here.
from .models import UserProfile,Article,KeyWord,MetaData,Refrence,Author,Institution
admin.site.register(KeyWord)
admin.site.register(MetaData)
admin.site.register(UserProfile)
admin.site.register(Article)
admin.site.register(Refrence)
admin.site.register(Author)
admin.site.register(Institution)

