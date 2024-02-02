<<<<<<< HEAD
import os
from datetime import datetime

import requests
from Backend.util import ElasticSearchUtil
from article.documents import ArticleDocument
from article.extraction.extraction import PdfController
from django.core.files import File
from django.core.files.base import ContentFile
from django.http import JsonResponse
from django.views import View
from elasticsearch_dsl import Q
from article.filters.filters import AuthorsFilter


# Define the list of fields in the request data JSON
request_data_json = ['first_name', 'last_name', 'email', 'password']


class UploadArticlesView(View):

    @staticmethod
    def download_and_store_pdf(url):
        try:
            response = requests.get(url)

            pdfs_directory = 'pdfs'
            if not os.path.exists(pdfs_directory):
                os.makedirs(pdfs_directory)

            pdf_path = os.path.join(pdfs_directory, f"article_{datetime.now()}_{1}.pdf")

            with open(pdf_path, 'wb') as pdf_file:
                pdf_file.write(response.content)

            content_file = ContentFile(response.content)
            pdf_file = File(content_file, name=f"article_{datetime.now()}_{1}.pdf")
            json_data = PdfController.process_and_store_pdf(pdf_path, pdf_file)

            return json_data

        except Exception as e:
            raise Exception(f"Error downloading and storing PDF: {str(e)}")

    @staticmethod
    def search_and_print_results():
        search_term = 'Daniel Levinson'

        author_name_filter = AuthorsFilter()

        # Create a base search using ArticleDocument
        base_search = ArticleDocument.search()

        # Apply the author name filter to the base search
        filtered_search = author_name_filter.filter(base_search, [search_term])

        # Execute the search
        search_results = filtered_search.execute()

        # Process the search results as needed
        for hit in search_results:
            print("Document ID:", hit.meta.id)
            print("Title:", hit.meta_data.title)
            # Add more fields as needed

    def get(self, request):
        try:
            ElasticSearchUtil.get_elasticsearch_connection()

            url = request.GET.get('url')

            self.download_and_store_pdf(url)

            self.search_and_print_results()

            return JsonResponse({'message': 'Upload réussi!'})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
=======
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import YourModel
from .serializers import YourModelSerializer
from rest_framework import generics


class YourModelListCreateView(generics.ListCreateAPIView):
    queryset = YourModel.objects.all()
    serializer_class = YourModelSerializer



@api_view(['POST'])
def create_your_model(request):
    serializer = YourModelSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
>>>>>>> MAHRAZABDELRAHMEN
