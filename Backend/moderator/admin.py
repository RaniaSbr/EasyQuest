from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Moderator


admin.site.register(Moderator)
