# serializers.py
from rest_framework import serializers
from .models import Reference, Author, Keyword, Institution, MetaData, Article


class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = ['id', 'publicationDate', 'title']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'app_label']


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ['id', 'name']


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id', 'name']


class MetaDataSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True)
    authors = AuthorSerializer(many=True)
    institutions = InstitutionSerializer(many=True)
    references = ReferenceSerializer(many=True)

    class Meta:
        model = MetaData
        fields = ['id', 'title', 'fullText', 'abstract', 'keywords', 'authors', 'institutions', 'references']


class ArticleSerializer(serializers.ModelSerializer):
    content = MetaDataSerializer()

    class Meta:
        model = Article
        fields = ['id', 'content']
