from rest_framework.decorators import api_view , authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from UserPart.models import MetaData, UserProfile,Article, KeyWord, Author, Institution, Refrence
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from rest_framework.authtoken.models import Token
from .serialaizers import topicSerializer
from django.db.models import Q
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Document, Text, Date
from elasticsearch_dsl.field import Object,Keyword
from elasticsearch_dsl.connections import connections

connections.create_connection(alias='default', hosts=['http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200']) #ici changer le lien
@api_view(['POST'])
@csrf_protect
@csrf_exempt
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user_profile = UserProfile.objects.get(user__username=username)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Incorrect username or password.'}, status=status.HTTP_401_UNAUTHORIZED)
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        message = "Login successful"
        return Response({'message': message, 'token': token.key}, status=status.HTTP_200_OK)
    else:
        message = "Incorrect password"
        return Response({'error': message}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout_user(request):
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.hashers import check_password

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_username(request):
    new_username = request.data.get('new_username')
    user_profile = request.user.userprofile
    if not new_username:
        return Response({'message': 'New username is required'}, status=400)
    if User.objects.exclude(id=user_profile.id).filter(username=new_username).exists():
        return Response({'message': 'Username already exists for another user'}, status=400)
    user_profile.user.username = new_username
    user_profile.user.save()
    return Response({'message': 'Username updated successfully'}, status=200)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_password(request):
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    if not current_password or not new_password:
        return Response({'message': 'Current password and new password are required'}, status=400)
    user_profile = request.user.userprofile
    if not check_password(current_password, user_profile.user.password):
        return Response({'message': 'Incorrect current password'}, status=400)
    user_profile.user.set_password(new_password)
    user_profile.user.save()
    update_session_auth_hash(request, user_profile)
    return Response({'message': 'Password updated successfully'}, status=200)

@api_view(['POST'])
@permission_classes([AllowAny])
def sign_up(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    password = request.data.get('password')
    if not first_name or not last_name or not email or not password:
        return Response({'message': 'All fields are required'}, status=400)
    if User.objects.filter(email=email).exists():
        return Response({'message': 'User with this email already exists'}, status=400)
    user = User.objects.create_user(username=email, email=email, password=password)
    user_profile = UserProfile.objects.create(user = user)
    return Response({'message': 'User registered successfully'}, status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_favorites(request):
    try:
        user_profile = request.user.userprofile
        print(request.user.userprofile)
    except UserProfile.DoesNotExist:
        return Response({'message': 'UserProfile not found'}, status=404)
    favorites_list = user_profile.favorites.all()
    print(favorites_list)
    serializer = topicSerializer(favorites_list, many=True)
    return Response({'favorites': serializer.data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_favorites(request, article_id):
    user_profile = request.user.userprofile
    article = get_object_or_404(Article, id=article_id)
    user_profile.favorites.add(article)
    favorites_list = user_profile.favorites.all()
    serializer = topicSerializer(favorites_list, many=True)
    return Response({'favorites': serializer.data, 'message': f'Article with ID {article_id} added to favorites'}, status=200)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_favorite(request, article_id):
    try:
        user_profile = request.user.userprofile
    except UserProfile.DoesNotExist:
        return Response({'message': 'UserProfile not found'}, status=404)
    article = get_object_or_404(Article, id=article_id)
    user_profile.favorites.remove(article)
    favorites_list = user_profile.favorites.all()
    serializer = topicSerializer(favorites_list, many=True)
    return Response({'favorites': serializer.data, 'message': f'Article with ID {article_id} removed from favorites'}, status=200)


@api_view(['GET'])
def getArlicles(request):
    q = request.GET.get('q') if request.GET.get('q')!=None else ''
    articles = Article.objects.filter(Q(content__tilte__icontains=q))
    articles_count = articles.count()
    serializer =topicSerializer(articles,many=True)
    context = {'articles':serializer.data,
               'arlicles_count':articles_count
              }
    if articles_count == 0:
        message = 'Aucun article trouvé.'
    else:
        message = f'{articles_count} article(s) trouvé(s) pour la recherche "{q}".'      
    context['message'] = message
    return Response(context,status=200)


@api_view(['GET'])
def search_articles(request): 
    query = request.GET.get('q', '')
    es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")
    body = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["content.tilte", "content.fullText", "content.abstruct"]
            }
        }
    }   
    result = es.search(index='articls1', body=body) # type: ignore
    article_ids = [hit['_id'] for hit in result['hits']['hits']]
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = topicSerializer(articles, many=True)
    articles_count = articles.count()
    context ={'query':query,
              'articles_count':articles_count,
              'results':serializer.data}
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_articles_autors(request): 
    query = request.GET.get('q', '')
    es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")
    body = {
    "query": {
        "match": {
            "content.autors": query
        }
    }
}
    result = es.search(index='articls1', body=body) # type: ignore
    article_ids = [hit['_id'] for hit in result['hits']['hits']]
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = topicSerializer(articles, many=True)
    articles_count = articles.count()
    context ={'query':query,
              'articles_count':articles_count,
              'results':serializer.data}
    return Response(context, status=status.HTTP_200_OK)

@api_view(['GET'])
def search_articles_keywords(request): 
    query = request.GET.get('q', '')
    es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")
    body = {
    "query": {
        "match": {
            "content.KeyWords": query
        }
    }
}
    result = es.search(index='articls1', body=body) # type: ignore
    article_ids = [hit['_id'] for hit in result['hits']['hits']]
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = topicSerializer(articles, many=True)
    articles_count = articles.count()
    context ={'query':query,
              'articles_count':articles_count,
              'results':serializer.data}
    return Response(context, status=status.HTTP_200_OK)



@api_view(['GET'])
def search_articles_institution(request): 
    query = request.GET.get('q', '')
    es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")
    body = {
    "query": {
        "match": {
            "content.institution": query
        }
    }
}
    result = es.search(index='articls1', body=body) # type: ignore
    article_ids = [hit['_id'] for hit in result['hits']['hits']]
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = topicSerializer(articles, many=True)
    articles_count = articles.count()
    context ={'query':query,
              'articles_count':articles_count,
              'results':serializer.data}
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_articles_refrences(request): 
    query = request.GET.get('q', '')
    es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")
    body = {
    "query": {
        "match": {
            "content.refrences.title": query
        }
    }
}
    result = es.search(index='articls1', body=body) # type: ignore
    article_ids = [hit['_id'] for hit in result['hits']['hits']]
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = topicSerializer(articles, many=True)
    articles_count = articles.count()
    context ={'query':query,
              'articles_count':articles_count,
              'results':serializer.data}
    return Response(context, status=status.HTTP_200_OK)


class ArticleIndex(Document):
    title = Text(fields={'raw': Keyword()})
    fullText = Text()
    publicationDate = Date()
    abstruct = Text()
    KeyWords = Text(multi=True)
    autors = Text(multi=True)
    institution = Text(multi=True)
    refrences = Object(multi=True)

    class Index:
        name = 'articls'

def index_article(article):
    keywords = [kw.name for kw in article.content.KeyWords.all()]
    authors = [author.name for author in article.content.autors.all()]
    institutions = [institution.name for institution in article.content.institution.all()]
    references = [
        {
            'publicationDate': ref.publicationDate,
            'title': ref.title
        }
        for ref in article.content.refrences.all()
    ]
    article_index = ArticleIndex(
        meta={'id': article.id},
        title=article.content.tilte,
        fullText=article.content.fullText,
        abstruct=article.content.abstruct,
        KeyWords=keywords,
        autors=authors,
        institution=institutions,
        refrences=references
    )
    article_index.save()




