from django.db import models


class Author(models.Model):
    class Meta:
        app_label = 'article'
    name = models.CharField(max_length=80, null=True, blank=True)
    objects = models.Manager()

    def __str__(self):
        return self.name


class Reference(models.Model):
    class Meta:
        app_label = 'article'
    publicationDate = models.DateField()
    title = models.TextField(max_length=255)
    objects = models.Manager()

    def __str__(self):
        return self.title


class Keyword(models.Model):
    class Meta:
        app_label = 'article'
    name = models.CharField(max_length=255)
    objects = models.Manager()


class Institution(models.Model):
    class Meta:
        app_label = 'article'
    name = models.CharField(max_length=50)
    objects = models.Manager()

    def __str__(self):
        return self.name


class MetaData(models.Model):
    class Meta:
        app_label = 'article'
    title = models.CharField(max_length=255)
    fullText = models.TextField()
    abstract = models.TextField()
    keywords = models.ManyToManyField(Keyword)
    authors = models.ManyToManyField(Author)
    institutions = models.ManyToManyField(Institution)
    references = models.ManyToManyField(Reference)
    objects = models.Manager()


class Article(models.Model):
    class Meta:
        app_label = 'article'
    content = models.OneToOneField(MetaData, on_delete=models.SET_NULL, null=True)
    objects = models.Manager()

