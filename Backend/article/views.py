from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_GET
from rest_framework import generics, viewsets
from datetime import datetime
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.shortcuts import get_object_or_404
from django.http import FileResponse
from .controller import CreateArticleUtil
from .models import *
from django.db import transaction
from dotenv import load_dotenv
import os
from .serializers import (
    ReferenceSerializer,
    AuthorSerializer,
    InstitutionSerializer,
    MetaDataSerializer,
    ArticleSerializer,
    UnPublishedArticleSerializer
)
from article.filters.utils import FilterUtil
from Backend.permissions import MODS_ADMIN_NO_USER_PERM, MODS_PERMISSION
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Document, Text, Date
from elasticsearch_dsl.field import Object, Keyword
from Backend.util import ElasticSearchUtil

load_dotenv()
article_index = os.environ.get("ARTICLE_TEST_INDEX")

@api_view(['GET'])
def get_articles(request):
    elasticsearch_instance = ElasticSearchUtil()
    elasticsearch_instance.get_elasticsearch_connection()
    q = request.GET.get('q') if request.GET.get('q') is not None else ''
    articles = Article.objects.filter(Q(meta_data__tilte__icontains=q))
    articles_count = articles.count()
    serializer = ArticleSerializer(articles, many=True)
    context = {'articles': serializer.data,
               'arlicles_count': articles_count
               }

    if articles_count == 0:
        message = 'Aucun article trouvé.'
    else:
        message = f'{articles_count} article(s) trouvé(s) pour la recherche "{q}".'

    context['message'] = message
    return Response(context, status=200)


@api_view(['GET'])
def search_articles(request):
    query = request.GET.get('q', '')
    elasticsearch_instance = ElasticSearchUtil()
    es = elasticsearch_instance.create_elasticsearch_instance()
    body = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["meta_data.title", "meta_data.fullText", "meta_data.abstract", "meta_data.authors",
                           "meta_data.keywords", "meta_data.institution"]
            }
        }
    }

    result = es.search(index='article', body=body)  # type: ignore
    article_ids = []
    non_integer_ids = []
    for hit in result['hits']['hits']:
        try:
            article_id = int(hit['_id'])
            article_ids.append(article_id)
        except ValueError:
            print(f"Failed to convert _id {hit['_id']} to int. Skipping.")
            non_integer_ids.append(hit['_id'])
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = ArticleSerializer(articles, many=True)
    articles_count = articles.count()

    if articles_count == 0:
        message = 'Aucun article trouvé.'
    else:
        message = f'{articles_count} article(s) trouvé(s) pour la recherche "{query}".'

    context = {'articles_count': articles_count, 'results': serializer.data, 'message': message}
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_articles_author(request):
    query = request.GET.get('q', '')
    elasticsearch_instance = ElasticSearchUtil()
    es = elasticsearch_instance.create_elasticsearch_instance()
    body = {
        "query": {
            "match": {
                "meta_data.authors": query
            }
        }
    }
    result = es.search(index='article', body=body)  # type: ignore
    article_ids = []
    non_integer_ids = []
    for hit in result['hits']['hits']:
        try:
            article_id = int(hit['_id'])
            article_ids.append(article_id)
        except ValueError:
            print(f"Failed to convert _id {hit['_id']} to int. Skipping.")
            non_integer_ids.append(hit['_id'])
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = ArticleSerializer(articles, many=True)
    articles_count = articles.count()
    context = {'query': query,
               'articles_count': articles_count,
               'results': serializer.data}
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_articles_keywords(request):
    elasticsearch_instance = ElasticSearchUtil()
    elasticsearch_instance.get_elasticsearch_connection()
    query = request.GET.get('q', '')
    es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")
    body = {
        "query": {
            "match": {
                "meta_data.KeyWords": query
            }
        }
    }
    result = es.search(index='articls4', body=body)  # type: ignore

    article_ids = []
    non_integer_ids = []
    for hit in result['hits']['hits']:
        try:
            article_id = int(hit['_id'])
            article_ids.append(article_id)
        except ValueError:
            print(f"Failed to convert _id {hit['_id']} to int. Skipping.")
            non_integer_ids.append(hit['_id'])

    print(non_integer_ids)
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = ArticleSerializer(articles, many=True)
    articles_count = articles.count()
    context = {'query': query,
               'articles_count': articles_count,
               'results': serializer.data}
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_articles_institution(request):
    query = request.GET.get('q', '')
    elasticsearch_instance = ElasticSearchUtil()
    elasticsearch_instance.get_elasticsearch_connection()
    body = {
        "query": {
            "match": {
                "meta_data.institution": query
            }
        }
    }
    result = es.search(index='articls4', body=body)  # type: ignore
    article_ids = []
    non_integer_ids = []
    for hit in result['hits']['hits']:
        try:
            article_id = int(hit['_id'])
            article_ids.append(article_id)
        except ValueError:
            print(f"Failed to convert _id {hit['_id']} to int. Skipping.")
            non_integer_ids.append(hit['_id'])
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = ArticleSerializer(articles, many=True)
    articles_count = articles.count()
    context = {'query': query,
               'articles_count': articles_count,
               'results': serializer.data}
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_articles_references(request):
    query = request.GET.get('q', '')
    es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")
    body = {
        "query": {
            "match": {
                "meta_data.references.title": query
            }
        }
    }
    result = es.search(index='articls4', body=body)  # type: ignore
    print(result)
    article_ids = []
    non_integer_ids = []
    for hit in result['hits']['hits']:
        try:
            article_id = int(hit['_id'])
            article_ids.append(article_id)
        except ValueError:
            print(f"Failed to convert _id {hit['_id']} to int. Skipping.")
            non_integer_ids.append(hit['_id'])
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = ArticleSerializer(articles, many=True)
    articles_count = articles.count()
    context = {'query': query,
               'articles_count': articles_count,
               'results': serializer.data}
    return Response(context, status=status.HTTP_200_OK)


class ArticleIndex(Document):
    title = Text(fields={'raw': Keyword()})
    fullText = Text()
    publicationDate = Date()
    abstract = Text()
    KeyWords = Text(multi=True)
    author = Text(multi=True)
    institution = Text(multi=True)
    references = Object(multi=True)

    class Index:
        name = 'articls'


def index_article(article):
    keywords = [kw.name for kw in article.meta_data.KeyWords.all()]
    authors = [author.name for author in article.meta_data.author.all()]
    institutions = [institution.name for institution in article.meta_data.institution.all()]
    references = [
        {
            'publicationDate': ref.publicationDate,
            'title': ref.title
        }
        for ref in article.meta_data.references.all()
    ]
    article_index = ArticleIndex(
        meta={'id': article.id},
        title=article.meta_data.tilte,
        fullText=article.meta_data.fullText,
        abstract=article.meta_data.abstract,
        KeyWords=keywords,
        author=authors,
        institution=institutions,
        references=references
    )
    article_index.save()


"""
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
"""


class ReferenceListCreateView(PermissionRequiredMixin, generics.ListCreateAPIView):
    permission_required = MODS_ADMIN_NO_USER_PERM
    raise_exception = True
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer


class AuthorListCreateView(PermissionRequiredMixin, generics.ListCreateAPIView):
    permission_required = MODS_ADMIN_NO_USER_PERM
    raise_exception = True
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class InstitutionListCreateView(PermissionRequiredMixin, generics.ListCreateAPIView):
    permission_required = MODS_ADMIN_NO_USER_PERM
    raise_exception = True
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer


class MetaDataListCreateView(PermissionRequiredMixin, generics.ListCreateAPIView):
    permission_required = MODS_ADMIN_NO_USER_PERM
    raise_exception = True
    queryset = MetaData.objects.all()
    serializer_class = MetaDataSerializer


class ArticleListCreateView(generics.ListAPIView):
    raise_exception = True
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class UnPublishedArticleDetailView(viewsets.ModelViewSet):
    queryset = UnPublishedArticle.objects.all()
    serializer_class = UnPublishedArticleSerializer

    @staticmethod
    def validate(request, pk):
        try:
            article = get_object_or_404(UnPublishedArticle, pk=pk)

            new_meta_data = article.get_meta_data()

            with transaction.atomic():
                new_meta_data.id = None
                new_meta_data.save()

                will_be_published_article = Article.objects.create(
                    meta_data=new_meta_data,
                    pdf_file=article.get_pdf_file()
                )

                will_be_published_article.save()
                article.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None, *args):
        try:
            with transaction.atomic():
                article = UnPublishedArticle.objects.get(pk=pk)
                article.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None, *args, **kwargs):
        try:
            with transaction.atomic():
                article = get_object_or_404(UnPublishedArticle, pk=pk)
                data = request.data.get('meta_data', article.get_meta_data())
                CreateArticleUtil.create_article_from_object(data, article.get_pdf_file())
                return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @staticmethod
    def serve_unpublished_article_pdf(request, pk):
        unpublished_article = get_object_or_404(UnPublishedArticle, pk=pk)
        print(unpublished_article)
        return FileResponse(unpublished_article.get_pdf_file(), as_attachment=True)

    def retrieve(self, request, pk=None, *args):
        paper = get_object_or_404(UnPublishedArticle, pk=pk)
        serializer = self.get_serializer(paper)
        return Response(serializer.data)


class UnPublishedArticleListCreateView(generics.ListAPIView):
    raise_exception = True
    queryset = UnPublishedArticle.objects.all()
    serializer_class = UnPublishedArticleSerializer


class ArticleManager(PermissionRequiredMixin, viewsets.ModelViewSet):
    permission_required = MODS_PERMISSION
    raise_exception = True
    queryset = UnPublishedArticle.objects.all()
    serializer_class = UnPublishedArticleSerializer

    @staticmethod
    def get_articles_list():
        article = UnPublishedArticle.objects.all()
        serializer = UnPublishedArticleSerializer(article, many=True)
        return Response(serializer.data)

    @staticmethod
    def destroy(request, pk=None, *args):
        try:
            article = UnPublishedArticle.objects.get(pk=pk)
            article.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None, *args):
        try:
            article = UnPublishedArticle.objects.get(pk=pk)
            serializer = UnPublishedArticleSerializer(article, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                print(serializer.errors)  #
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


@require_GET
def search_api(request):
    """
            Function to return a filter json based on query that contains json details

            Returns:
                json: list of results
    """
    keywords = request.GET.getlist('keywords', [])
    authors = request.GET.getlist('authors', [])
    institutions = request.GET.getlist('institutions', [])
    start_date = request.GET.getlist('start_date', [])
    end_date = request.GET.getlist('end_date', [])
    date_range = [start_date, end_date]
    date_range[0] = start_date if start_date else datetime(1970, 1, 1)
    date_range[1] = end_date if end_date else datetime(datetime.today().year, 12, 30)
    filters = {
        'keywords': keywords,
        'authors': authors,
        'institutions': institutions,
        'publication_date': date_range,
    }
    results = FilterUtil.apply_filter(filters)
    if isinstance(results, str):
        return {"Exception": results}
    else:
        return JsonResponse(results.to_dict())
