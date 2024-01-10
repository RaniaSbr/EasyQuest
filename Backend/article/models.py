from django.db import models

from Backend.article.extraction.test.cermine_xml_sample import EXPECTED_OUTPUT


class Author(models.Model):
    """
    Represents an Author of a reearch article.

    Attributes:
        name (CharField): The name of the author.
        affiliations (TextField): The affiliations of the author.
    """
    objects = models.Manager()
    name = models.CharField(max_length=255, default="None")
    affiliations = models.TextField(default="None")

    class Meta:
        app_label = 'article'

    def __str__(self):
        return self.name


class Institution(models.Model):
    """
    Represents an institution mentioned in a scholarly article.

    Attributes:
        label (CharField): The label of the institution.
        name (CharField): The name of the institution.
        address (TextField): The address of the institution.
        country (CharField): The country of the institution.
    """

    label = models.CharField(max_length=255, default="None")
    name = models.CharField(max_length=255, default="None")
    address = models.TextField(default="None")
    country = models.CharField(max_length=255, default="None")
    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'article'


class Reference(models.Model):
    """
    Represents a reference in a scholarly article.

    Attributes:
        publication_year (CharField): The publication year of the reference.
        article_title (TextField): The title of the referenced article.
        source (TextField): The source of the reference.
        volume (CharField): The volume of the reference.
        authors (ManyToManyField): Many-to-many relationship with Author model.
    """

    publication_year = models.CharField(max_length=12, default="None")
    article_title = models.TextField(default="None")
    source = models.TextField(default="None")
    volume = models.CharField(max_length=20, default="None")
    authors = models.ManyToManyField(Author, related_name="references")
    objects = models.Manager()

    def __str__(self):
        return f"Reference Title: {self.article_title}"

    class Meta:
        app_label = 'article'


class MetaData(models.Model):
    """
    Represents metadata for a scholarly article.

    Attributes:
        doi (CharField): The DOI (Digital Object Identifier) of the article.
        title (TextField): The title of the article.
        pub_date (CharField): The publication year of the article.
        references (ManyToManyField): Many-to-many relationship with Reference model.
    """

    doi = models.CharField(max_length=255, default="None")
    title = models.TextField(default="None")
    pub_date = models.CharField(max_length=4, default="None")
    references = models.ManyToManyField(Reference, related_name="citations")
    keywords = models.TextField(default='[]')
    objects = models.Manager()

    def __str__(self):
        return f"DOI: {self.doi}, Title: {self.title}"

    class Meta:
        app_label = 'article'


class Article(models.Model):
    """
    Represents a research article.

    Attributes:
        meta_data (OneToOneField): One-to-one relationship with MetaData model.
        blob (TextField): The blob data for the article.
    """
    objects = models.Manager()
    meta_data = models.OneToOneField(MetaData, on_delete=models.CASCADE, default=EXPECTED_OUTPUT)
    blob = models.TextField(default="None")

    class Meta:
        app_label = 'article'
