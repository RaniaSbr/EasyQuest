# search_indexes.py
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Article


@registry.register_document
class ArticleDocument(Document):
    class Index:
        name = 'article'
        settings = {'number_of_shards': 1, 'number_of_replicas': 0}

    meta_data = fields.ObjectField(properties={
        'doi': fields.TextField(),
        'title': fields.TextField(),
        'pub_date': fields.TextField(),
        'keywords': fields.TextField(),
    })

    class Django:
        model = Article
