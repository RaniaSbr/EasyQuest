from rest_framework import serializers
from .models import *


class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'


class MetaDataSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    institutions = InstitutionSerializer(many=True)
    references = ReferenceSerializer(many=True)

    class Meta:
        model = MetaData
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
