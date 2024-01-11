# UserPart/management/commands/import_data.py
import json
from django.core.management.base import BaseCommand
from article.models import Refrence, Author, KeyWord, Institution, MetaData, Article

class Command(BaseCommand):
    help = 'Import data from JSON file to Django models'

    def handle(self, *args, **kwargs):
        # Charger le fichier JSON
        with open('UserPart\management\commands\output.json', 'r') as fichier_json:
            data = json.load(fichier_json)

        # Parcourir les articles dans le fichier JSON
        for article_data in data:
            # Créer une référence
            refrence, created = Refrence.objects.get_or_create(
                publicationDate=article_data['publication_date'],
                title=article_data['title']
            )

            # Créer des auteurs
            authors = [Author.objects.get_or_create(name=author)[0] for author in article_data['authors']]

            # Créer des mots-clés
            keywords = [KeyWord.objects.get_or_create(name=keyword)[0] for keyword in article_data['keywords']]

            # Créer des institutions
            institutions = [Institution.objects.get_or_create(name=institution)[0] for institution in article_data['institutions']]

            # Créer une métadonnée
            metadata, created = MetaData.objects.get_or_create(
                tilte=article_data['title'],
                fullText=article_data['abstract'],
                abstruct=article_data['abstract']
            )
            metadata.KeyWords.set(keywords)
            metadata.autors.set(authors)
            metadata.institution.set(institutions)

            # Créer un article
            article, created = Article.objects.get_or_create(content=metadata)
