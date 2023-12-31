# serializers.py
from rest_framework import serializers
<<<<<<< HEAD
from .models import *
=======
from .models import Reference, Author, Keyword, Institution, MetaData, Article
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)


class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
<<<<<<< HEAD
        fields = '__all__'
=======
        fields = ['id', 'publicationDate', 'title']
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
<<<<<<< HEAD
        fields = '__all__'
=======
        fields = ['id', 'name', 'app_label']


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ['id', 'name']
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
<<<<<<< HEAD
        fields = '__all__'


class MetaDataSerializer(serializers.ModelSerializer):
=======
        fields = ['id', 'name']


class MetaDataSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True)
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
    authors = AuthorSerializer(many=True)
    institutions = InstitutionSerializer(many=True)
    references = ReferenceSerializer(many=True)

    class Meta:
        model = MetaData
<<<<<<< HEAD
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    meta_data = MetaDataSerializer()

    class Meta:
        model = Article
        fields = '__all__'


class UnPublishedArticleSerializer(serializers.ModelSerializer):
    meta_data = MetaDataSerializer()

    class Meta:
        model = UnPublishedArticle
        fields = '__all__'
=======
        fields = ['id', 'title', 'fullText', 'abstract', 'keywords', 'authors', 'institutions', 'references']


class ArticleSerializer(serializers.ModelSerializer):
    content = MetaDataSerializer()

    class Meta:
        model = Article
        fields = ['id', 'content']
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
