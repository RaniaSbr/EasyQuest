# serializers.py
from rest_framework import serializers
<<<<<<< HEAD
<<<<<<< HEAD
from .models import *
=======
from .models import Reference, Author, Keyword, Institution, MetaData, Article
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
from .models import Reference, Author, Institution, MetaData, Article
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)


class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
<<<<<<< HEAD
<<<<<<< HEAD
        fields = '__all__'
=======
        fields = ['id', 'publicationDate', 'title']
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
        fields = '__all__'
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
<<<<<<< HEAD
<<<<<<< HEAD
        fields = '__all__'
=======
        fields = ['id', 'name', 'app_label']


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ['id', 'name']
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
        fields = '__all__'
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
<<<<<<< HEAD
<<<<<<< HEAD
        fields = '__all__'


class MetaDataSerializer(serializers.ModelSerializer):
=======
        fields = ['id', 'name']


class MetaDataSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True)
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
        fields = '__all__'


class MetaDataSerializer(serializers.ModelSerializer):
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
    authors = AuthorSerializer(many=True)
    institutions = InstitutionSerializer(many=True)
    references = ReferenceSerializer(many=True)

    class Meta:
        model = MetaData
<<<<<<< HEAD
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
=======
        fields = '__all__'
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)


class ArticleSerializer(serializers.ModelSerializer):
    content = MetaDataSerializer()

    class Meta:
        model = Article
        fields = ['id', 'content']
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
