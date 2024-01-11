from rest_framework import serializers
from .models import Article,Refrence,Author,KeyWord,Institution,MetaData


class RefrenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refrence
        fields = ['publicationDate', 'title']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['name']

class KeyWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeyWord
        fields = ['name']

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['name']

class MetaDataSerializer(serializers.ModelSerializer):
    KeyWords = KeyWordSerializer(many=True)
    autors = AuthorSerializer(many=True)
    institution = InstitutionSerializer(many=True)
    refrences = RefrenceSerializer(many=True)

    class Meta:
        model = MetaData
        fields = ['tilte', 'fullText', 'abstruct', 'KeyWords', 'autors', 'institution', 'refrences']



class topicSerializer(serializers.ModelSerializer):
    content = MetaDataSerializer()
    class Meta:
        model = Article
        fields = '__all__'