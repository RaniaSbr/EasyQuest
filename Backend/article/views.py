from rest_framework import generics
from .models import Reference, Author, Keyword, Institution, MetaData, Article
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from filters.filters import KeywordsFilter, AuthorsFilter, InstitutionsFilter, DateRangeFilter

from .serializers import (
    ReferenceSerializer,
    AuthorSerializer,
    KeywordSerializer,
    InstitutionSerializer,
    MetaDataSerializer,
    ArticleSerializer,
)


class ReferenceListCreateView(generics.ListCreateAPIView):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer


class AuthorListCreateView(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class KeywordListCreateView(generics.ListCreateAPIView):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer


class InstitutionListCreateView(generics.ListCreateAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer


class MetaDataListCreateView(generics.ListCreateAPIView):
    queryset = MetaData.objects.all()
    serializer_class = MetaDataSerializer


class ArticleListCreateView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer




@require_GET
def search_api(request):
    # Extract filter parameters from the request
    keywords = request.GET.getlist('keywords', [])
    authors = request.GET.getlist('authors', [])
    institutions = request.GET.getlist('institutions', [])
    date_range = request.GET.getlist('date_range', [])

    # Define filter data
    filters = {
        'keywords': keywords,
        'authors': authors,
        'institutions': institutions,
        'date_range': date_range,
    }

    # Perform Elasticsearch search using the filters
    results = perform_elasticsearch_search(filters)

    # Convert Elasticsearch results to a format suitable for API response
    response_data = {'results': results.to_dict()}

    return JsonResponse(response_data)
