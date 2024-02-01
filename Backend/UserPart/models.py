from django.db import models
from django.contrib.auth.models import User, AbstractUser


class Refrence(models.Model):
    publicationDate = models.DateField()
    title = models.TextField(max_length=255)

    def __str__(self):
        return self.title


class Author(models.Model):
    name = models.CharField(max_length=80, null=True, blank=True)

    def __str__(self):
        return self.name


class KeyWord(models.Model):
    name = models.CharField(max_length=255)


class Institution(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class MetaData(models.Model):
    tilte = models.CharField(max_length=255)
    fullText = models.TextField()
    abstruct = models.TextField()
    KeyWords = models.ManyToManyField(KeyWord)
    autors = models.ManyToManyField(Author)
    institution = models.ManyToManyField(Institution)
    refrences = models.ManyToManyField(Refrence)


class Article(models.Model):
    content = models.OneToOneField(MetaData, on_delete=models.SET_NULL, null=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(Article, related_name='favorited_by', blank=True)

    def __str__(self):
        return self.user.name


