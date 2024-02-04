from django.db import models
from django.contrib.auth.models import User
from article.models import Article
from Backend.permissions import USER_PERMISSION


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(Article, related_name='favorited_by', blank=True)
    auth = "USER"
    objects = models.Manager()

    class Meta:
        permissions = [
            (USER_PERMISSION, "user_only_perm"),
        ]

    def __str__(self):
        return self.user.first_name
