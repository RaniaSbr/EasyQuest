# UserPart/management/commands/import_data.py
import json
from django.core.management.base import BaseCommand
from article.models import Reference, Author, Institution, MetaData, Article
import os
class Command(BaseCommand):
    help = 'Import data from JSON file to Django models'

    def handle(self, *args, **kwargs):
        # Charger le fichier JSON
        chemin_fichier = os.path.join('D:', 'omaromar', 'UserPart', 'management', 'commands', 'output.json')
        with open(chemin_fichier, 'r') as fichier_json:
            data = json.load(fichier_json)

        # Parcourir les articles dans le fichier JSON
        for article_data in data:
            # Créer une référence
            reference, created = Reference.objects.get_or_create(
            publication_year=article_data['publication_date'],  # Utilisez publication_year au lieu de publicationDate
            article_title=article_data['title']
)

            # Créer des auteurs
            authors = [Author.objects.get_or_create(name=author)[0] for author in article_data['authors']]

            # Créer des mots-clés
            
            # Créer des institutions
            institutions = [Institution.objects.get_or_create(name=institution)[0] for institution in article_data['institutions']]

            # Créer une métadonnée
            metadata, created = MetaData.objects.get_or_create(
                title=article_data['title'],
               
                abstract=article_data['abstract']
            )
            
            metadata.authors.set(authors)
            metadata.institutions.set(institutions)

            # Créer un article
            article, created = Article.objects.get_or_create( meta_data=metadata)
