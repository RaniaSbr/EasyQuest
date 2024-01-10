# serializers.py
from rest_framework import serializers
<<<<<<< HEAD
from .models import *
=======
from .models import Reference, Author, Institution, MetaData, Article
>>>>>>> MAHRAZABDELRAHMEN


class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = '__all__'
        fields = ['id', 'publicationDate', 'title']
        model = Author
        fields = '__all__'
        fields = ['id', 'name', 'app_label']


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ['id', 'name']


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'


class MetaDataSerializer(serializers.ModelSerializer):
        fields = ['id', 'name']


class MetaDataSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    institutions = InstitutionSerializer(many=True)
    references = ReferenceSerializer(many=True)

    class Meta:
        model = MetaData
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    meta_data = MetaDataSerializer()

    class Meta:
        model = Article
        fields = '__all__'


class UnPublishedArticleSerializer(serializers.ModelSerializer):
    meta_data = MetaDataSerializer()

    class Meta:
        model = UnPublishedArticle
        fields = '__all__'
<<<<<<< HEAD
=======
=======
        fields = ['id', 'title', 'fullText', 'abstract', 'keywords', 'authors', 'institutions', 'references']


class ArticleSerializer(serializers.ModelSerializer):
>>>>>>> 362a0136 (added Article Index + Filter Function + Need to create the api)
    content = MetaDataSerializer()

    class Meta:
        model = Article
        fields = ['id', 'content']
<<<<<<< HEAD
>>>>>>> MAHRAZABDELRAHMEN
=======
>>>>>>> 362a0136 (added Article Index + Filter Function + Need to create the api)
