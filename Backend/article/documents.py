<<<<<<< HEAD
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import *
=======
# search_indexes.py
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Article
>>>>>>> MAHRAZABDELRAHMEN


@registry.register_document
class ArticleDocument(Document):
    class Index:
        name = 'article'
        settings = {'number_of_shards': 1, 'number_of_replicas': 0}

<<<<<<< HEAD
    meta_data = fields.ObjectField(properties={
        'doi': fields.TextField(),
        'title': fields.TextField(),
        'pub_date': fields.TextField(),
        'authors': fields.ObjectField(properties={
            'name': fields.TextField(),
        }),
        'references': fields.ObjectField(properties={
            'raw_text': fields.TextField(),
         }),
        'institutions': fields.ObjectField(properties={
            'name': fields.KeywordField(),
        })

    })

    class Django:
        model = UnPublishedArticle


@registry.register_document
class PublishedArticleDocument(Document):
    class Index:
        name = 'published_article'
        settings = {'number_of_shards': 1, 'number_of_replicas': 0}

    meta_data = fields.ObjectField(properties={
        'doi': fields.TextField(),
        'title': fields.TextField(),
        'pub_date': fields.TextField(),
        'authors': fields.ObjectField(properties={
            'name': fields.TextField(),
        }),
        'references': fields.ObjectField(properties={
            'raw_text': fields.TextField(),
         }),
        'institutions': fields.ObjectField(properties={
            'name': fields.KeywordField(),
        })

=======
    content = fields.ObjectField(properties={
        'title': fields.TextField(),
        'abstract': fields.TextField(),
        'publication_date': fields.DateField(),
        'keywords': fields.NestedField(properties={'name': fields.TextField()}),
        'authors': fields.NestedField(properties={'name': fields.TextField()}),
>>>>>>> MAHRAZABDELRAHMEN
    })

    class Django:
        model = Article
