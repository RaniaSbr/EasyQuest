from rest_framework import generics
from .models import Reference, Author, Institution, MetaData, Article
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .filters.utils import FilterUtil
from datetime import datetime
from .serializers import (
    ReferenceSerializer,
    AuthorSerializer,
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
