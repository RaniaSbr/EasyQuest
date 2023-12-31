from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.shortcuts import get_object_or_404
from django.http import FileResponse

from .controller import CreateArticleUtil
from .models import *
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .filters.utils import FilterUtil
from django.db import transaction
from datetime import datetime
from .serializers import (
    ReferenceSerializer,
    AuthorSerializer,
    InstitutionSerializer,
    MetaDataSerializer,
    ArticleSerializer,
    UnPublishedArticleSerializer
)
from Backend.permissions import MODS_ADMIN_NO_USER_PERM, MODS_PERMISSION


class ReferenceListCreateView(PermissionRequiredMixin, generics.ListCreateAPIView):
    permission_required = MODS_ADMIN_NO_USER_PERM
    raise_exception = True
<<<<<<< HEAD
=======
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
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer


class AuthorListCreateView(PermissionRequiredMixin, generics.ListCreateAPIView):
    permission_required = MODS_ADMIN_NO_USER_PERM
    raise_exception = True
<<<<<<< HEAD
=======
class AuthorListCreateView(generics.ListCreateAPIView):
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
class InstitutionListCreateView(PermissionRequiredMixin, generics.ListCreateAPIView):
    permission_required = MODS_ADMIN_NO_USER_PERM
    raise_exception = True
=======
class KeywordListCreateView(generics.ListCreateAPIView):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer


=======
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
class InstitutionListCreateView(generics.ListCreateAPIView):
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
class InstitutionListCreateView(PermissionRequiredMixin, generics.ListCreateAPIView):
    permission_required = MODS_ADMIN_NO_USER_PERM
    raise_exception = True
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer


class MetaDataListCreateView(PermissionRequiredMixin, generics.ListCreateAPIView):
    permission_required = MODS_ADMIN_NO_USER_PERM
    raise_exception = True
<<<<<<< HEAD
=======
class MetaDataListCreateView(generics.ListCreateAPIView):
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)
    queryset = MetaData.objects.all()
    serializer_class = MetaDataSerializer


class ArticleListCreateView(generics.ListAPIView):
    raise_exception = True
<<<<<<< HEAD
=======
class ArticleListCreateView(generics.ListCreateAPIView):
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)
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
<<<<<<< HEAD
=======
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)


@require_GET
def search_api(request):
<<<<<<< HEAD
=======
@require_GET
def search_api(request):
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
    """
            Function to return a filter json based on query that contains json details

            Returns:
                json: list of results
    """
<<<<<<< HEAD
    keywords = request.GET.getlist('keywords', [])
    authors = request.GET.getlist('authors', [])
    institutions = request.GET.getlist('institutions', [])
    start_date = request.GET.getlist('start_date', [])
    end_date = request.GET.getlist('end_date', [])
    date_range = [start_date, end_date]
    date_range[0] = start_date if start_date else datetime(1970, 1, 1)
    date_range[1] = end_date if end_date else datetime(datetime.today().year, 12, 30)
=======
    # Extract filter parameters from the request
    keywords = request.GET.getlist('keywords', [])
    authors = request.GET.getlist('authors', [])
    institutions = request.GET.getlist('institutions', [])
    date_range = request.GET.getlist('date_range', [])

    # Define filter data
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
    keywords = request.GET.getlist('keywords', [])
    authors = request.GET.getlist('authors', [])
    institutions = request.GET.getlist('institutions', [])
    start_date = request.GET.getlist('start_date', [])
    end_date = request.GET.getlist('end_date', [])
    date_range = [start_date, end_date]
    date_range[0] = start_date if start_date else datetime(1970, 1, 1)
    date_range[1] = end_date if end_date else datetime(datetime.today().year, 12, 30)
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
    filters = {
        'keywords': keywords,
        'authors': authors,
        'institutions': institutions,
<<<<<<< HEAD
<<<<<<< HEAD
        'publication_date': date_range,
    }
    results = FilterUtil.apply_filter(filters)
    if isinstance(results, str):
        return {"Exception": results}
    else:
        return JsonResponse(results.to_dict())
=======
        'date_range': date_range,
    }

    # Perform Elasticsearch search using the filters
    results = perform_elasticsearch_search(filters)

    # Convert Elasticsearch results to a format suitable for API response
    response_data = {'results': results.to_dict()}

    return JsonResponse(response_data)
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
        'publication_date': date_range,
    }
    results = FilterUtil.apply_filter(filters)
    if isinstance(results, str):
        return {"Exception": results}
    else:
        return JsonResponse(results.to_dict())
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
