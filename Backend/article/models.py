from django.db import models


class Author(models.Model):
    """
    Represents an Author of a reearch article.

    Attributes:
        name (CharField): The name of the author.
    """
    name = models.CharField(max_length=255, default="None")
    objects = models.Manager()

    class Meta:
        app_label = 'article'

    def __str__(self):
        return self.name


class Institution(models.Model):
    """
    Represents an institution mentioned in a scholarly article.

    Attributes:
        department (CharField): The department of the institution.
        name (CharField): The name of the institution.
        address (TextField): The address of the institution.
        country (CharField): The country of the institution.
    """

    department = models.CharField(max_length=255, default="None")
    name = models.CharField(max_length=255, default="None")
    address = models.TextField(default="None")
    post_code = models.CharField(max_length=10, default="None")
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
        reference_id (TextField): The ID(DOI, PMID, PMC...) of the reference.
        volume (CharField): The volume of the reference.
        authors (ManyToManyField): Many-to-many relationship with Author model.
    """

    publication_year = models.CharField(max_length=12, default="None")
    article_title = models.TextField(default="None")
    reference_id = models.TextField(default="None")
    volume = models.CharField(max_length=10, default="None")
    authors = models.ManyToManyField(Author, related_name="references")
    raw_text = models.CharField(max_length=256, default="NONE")
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
    pub_date = models.CharField(max_length=10, default="None")
    references = models.ManyToManyField(Reference, related_name="citations")
    keywords = models.TextField(default='[]')
    abstract = models.TextField(default='None')
    authors = models.ManyToManyField(Author)
    institutions = models.ManyToManyField(Institution)
    objects = models.Manager()

    def __str__(self):
        return f"DOI: {self.doi}, Title: {self.title}"

    class Meta:
        app_label = 'article'


class BaseArticle(models.Model):
    """
    Base class for common attributes of research articles.

    Attributes:
        meta_data (OneToOneField): One-to-one relationship with MetaData model.
        pdf_file (FileField): The File of the article.
    """
    objects = models.Manager()
    meta_data = models.OneToOneField(MetaData, on_delete=models.CASCADE, default={})
    pdf_file = models.FileField(upload_to='pdfs/', null=True)

    class Meta:
        abstract = True

    def get_meta_data(self):
        return self.meta_data

    def set_meta_data(self, new_meta_data):
        self.meta_data = new_meta_data

    def get_pdf_file(self):
        return self.pdf_file

    def set_pdf_file(self, new_pdf_file):
        self.pdf_file = new_pdf_file


class Article(BaseArticle):
    """
    Represents a research article.
    """

    class Meta:
        app_label = 'article'


class UnPublishedArticle(BaseArticle):
    """
    Represents a research article that is still not unpublished to the users.
    """

    class Meta:
        app_label = 'article'
