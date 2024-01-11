from django.contrib import admin

from django.contrib import admin

# Register your models here.
from .models import Article,KeyWord,MetaData,Refrence,Author,Institution
admin.site.register(KeyWord)
admin.site.register(MetaData)
admin.site.register(Article)
admin.site.register(Refrence)
admin.site.register(Author)
admin.site.register(Institution)


