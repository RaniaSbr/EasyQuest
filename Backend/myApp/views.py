
from .models import Moderateur
from rest_framework import viewsets 
from django.contrib.auth.hashers import make_password
import secrets
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ModSerializer
from django.contrib.auth.hashers import check_password  # Import the check_password function
from rest_framework.decorators import action


class ModViewSet(viewsets.ModelViewSet):
    queryset = Moderateur.objects.all()
    serializer_class = ModSerializer

    def create(self, request, *args, **kwargs):
        # Generate a 12-character random password
        generated_password = secrets.token_urlsafe(8)  # 8 characteres password generated 
        #hashed_password = make_password(generated_password) # hash the password to stock it 
        hashed_password = generated_password
        user = Moderateur.objects.create(
            username=request.data['username'],
            email=request.data['email'],
            password=hashed_password
        )

        serializer = ModSerializer(user)

        return Response(serializer.data)

class ModerateurManager(viewsets.ModelViewSet):
    queryset = Moderateur.objects.all()
    serializer_class = ModSerializer

    def get_mod_list(self, request):
        moderators = Moderateur.objects.all()
        serializer = ModSerializer(moderators, many=True)
        return Response(serializer.data)
    
    def destroy(self, request, pk=None):
        try:
            moderator = Moderateur.objects.get(pk=pk)
            moderator.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Moderateur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'])
    def show_passwords(self, request, pk=None):
        try:
            moderator = Moderateur.objects.get(pk=pk)
            serialized_data = ModSerializer(moderator).data
            serialized_data['real_password'] = moderator.password
            return Response(serialized_data)
        except Moderateur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    def update(self, request, pk=None):
        try:
            moderator = Moderateur.objects.get(pk=pk)
            serializer = ModSerializer(moderator, data=request.data)
            if serializer.is_valid():
               serializer.save()
               return Response(serializer.data)
            else:
               print(serializer.errors)  #
               return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Moderateur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# views.py

from django.http import JsonResponse
from django.views import View
from .models import Article
import requests
import fitz  # PyMuPDF
from bs4 import BeautifulSoup

'''''
class UploadArticlesView(View):
    def post(self, request):
        #url = request.POST.get('url')
        url ='https://smallpdf.com/blog/sample-pdf'

        try:
            # Télécharger le PDF depuis l'URL
            response = requests.get(url)
            response.raise_for_status()

            pdf_content = response.content

            # Extraire le texte du PDF en utilisant PyMuPDF
            pdf_document = fitz.open(stream=pdf_content, filetype="pdf")
            article_text = ""

            for page_num in range(pdf_document.page_count):
                page = pdf_document[page_num]
                article_text += page.get_text()

            # Analyser le texte pour extraire les informations pertinentes
            # Dans cet exemple, nous supposons que chaque ligne représente un article
            lines = article_text.split('\n')

            for line in lines:
                # Votre logique pour extraire les données spécifiques de chaque article
                # par exemple, titre, contenu, etc.
                title = "Exemple de titre"
                content = line.strip()  # Utilisez une logique plus avancée pour extraire le contenu réel

                # Créer et enregistrer l'article dans la base de données Django
                Article.objects.create(title=title, content=content, pdf_url=url)

            # Fermer le document PDF
            pdf_document.close()

            # Votre logique pour indexer les articles dans Elasticsearch ici
            # Utilisez ArticleDocument.save() pour indexer chaque article dans Elasticsearch

            return JsonResponse({'message': 'Upload réussi!'})

        except Exception as e:
            # Gérer les erreurs et renvoyer un message d'erreur
            return JsonResponse({'error': str(e)}, status=400)
'''


''''
from django.http import JsonResponse
from django.views import View
import requests
from bs4 import BeautifulSoup

class UploadArticlesView(View):
    def get(self, request):
        url = request.GET.get('url')

        try:
            # Télécharger le PDF depuis l'URL
            response = requests.get(url)

            soup = BeautifulSoup(response.text, 'html.parser')
            links = soup.find_all('a')

            i = 0
            for link in links:
                if '.pdf' in link.get('href', []):
                    i += 1
                    print("Downloading file ", i)
                    response = requests.get(link.get('href'))
                    pdf = open('pdf' + str(i) + ".pdf", 'wb')
                    pdf.write(response.content)
                    pdf.close()
                    print('file ', i, 'downloaded')
            print("done")

            return JsonResponse({'message': 'Upload réussi!'})

        except Exception as e:
            # Gérer les erreurs et renvoyer un message d'erreur
            return JsonResponse({'error': str(e)}, status=400)

'''


from django.http import JsonResponse
from django.views import View
from .models import Article  
import requests
from bs4 import BeautifulSoup

class UploadArticlesView(View):
    def get(self, request):
        url = request.GET.get('url')

        try:
            # Télécharger le PDF depuis l'URL
            response = requests.get(url)

            soup = BeautifulSoup(response.text, 'html.parser')
            links = soup.find_all('a')

            i = 0
            for link in links:
                if '.pdf' in link.get('href', []):
                    i += 1
                    print("Downloading file ", i)
                    response = requests.get(link.get('href'))
                    pdf_content = response.content  # Store the PDF content

                    # Store the PDF content as a blob in the Article model
                    Article.objects.create(
                        title=f"Replace with actual logic for title {i}",
                        content=pdf_content,
                        pdf_url=link.get('href')
                    )

                    print('file ', i, 'downloaded')

            print("done")

            return JsonResponse({'message': 'Upload réussi!'})

        except Exception as e:
            # Gérer les erreurs et renvoyer un message d'erreur
            return JsonResponse({'error': str(e)}, status=400)


from django.http import JsonResponse
from django.views import View
from .models import Article

class ViewArticles(View):
    def get(self, request):
        try:
            # Retrieve all articles from the database
            articles = Article.objects.all()

            # Create a list to store the serialized data
            articles_data = []

            # Serialize each article's data
            for article in articles:
                article_data = {
                    'id': article.id,
                    'title': article.title,
                    'pdf_url': article.pdf_url,
                
                }
                articles_data.append(article_data)

            # Return the serialized data as JSON response
            return JsonResponse({'articles': articles_data})

        except Exception as e:
            # Handle errors and return an error response
            return JsonResponse({'error': str(e)}, status=500)

