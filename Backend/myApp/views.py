from django.core.files.base import ContentFile
from django.views import View
from django.http import JsonResponse
import requests
from elasticsearch import Elasticsearch
from django.core.files import File
from article.extraction.extraction import PdfController
import os
from datetime import datetime

request_data_json = ['first_name', 'last_name', 'email', 'password']


class UploadArticlesView(View):

    @staticmethod
    def get(request):

        elasticsearch_index = os.environ.get('ELASTICSEARCH_INDEX')
        es = Elasticsearch(
            ["https://localhost:9200"],
            basic_auth=("elastic", "DuF83ML=V2nOIp0hVDpj"), verify_certs=False)

        url = request.GET.get('url')
        try:
            # Télécharger le PDF depuis l'URL
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
            if 'references' in json_data:
                json_data.pop('references')

            return JsonResponse({'message': 'Upload réussi!'})

        except Exception as e:
            # Gérer les erreurs et renvoyer un message d'erreur
            return JsonResponse({'error': str(e)}, status=400)
