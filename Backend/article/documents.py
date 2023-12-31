# search_indexes.py
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Article


@registry.register_document
class ArticleDocument(Document):
    class Index:
        name = 'article'
        settings = {'number_of_shards': 1, 'number_of_replicas': 0}

    content = fields.ObjectField(properties={
        'title': fields.TextField(),
        'abstract': fields.TextField(),
        'publication_date': fields.DateField(),
        'keywords': fields.NestedField(properties={'name': fields.TextField()}),
        'authors': fields.NestedField(properties={'name': fields.TextField()}),
    })

    class Django:
        model = Article
