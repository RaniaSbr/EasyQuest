from django.shortcuts import render
from rest_framework.decorators import api_view , authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from UserPart.models import Article
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from rest_framework.authtoken.models import Token
from article.serialaizers import topicSerializer
from django.db.models import Q
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Document, Text, Date
from elasticsearch_dsl.field import Object,Keyword
from elasticsearch_dsl.connections import connections

connections.create_connection(alias='default', hosts=['http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200'])
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
                "fields": ["content.tilte", "content.fullText", "content.abstruct","content.autors","content.KeyWords", "content.institution"]
            }
        }
    }   
    
    result = es.search(index='articls2', body=body) # type: ignore
    article_ids = []
    non_integer_ids = []
    for hit in result['hits']['hits']:
        try:
            article_id = int(hit['_id'])
            article_ids.append(article_id)
        except ValueError:
            print(f"Failed to convert _id {hit['_id']} to int. Skipping.")
            non_integer_ids.append(hit['_id'])
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = topicSerializer(articles, many=True)
    articles_count = articles.count()
    
    if articles_count == 0:
        message = 'Aucun article trouvé.'
    else:
        message = f'{articles_count} article(s) trouvé(s) pour la recherche "{query}".'
        
   
    context ={
              'articles_count':articles_count,
              'results':serializer.data}
    context['message'] = message
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
    result = es.search(index='articls2', body=body) # type: ignore
    article_ids = []
    non_integer_ids = []
    for hit in result['hits']['hits']:
        try:
            article_id = int(hit['_id'])
            article_ids.append(article_id)
        except ValueError:
            print(f"Failed to convert _id {hit['_id']} to int. Skipping.")
            non_integer_ids.append(hit['_id'])
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
    result = es.search(index='articls3', body=body) # type: ignore
    
    article_ids = []
    non_integer_ids = []
    for hit in result['hits']['hits']:
        try:
            article_id = int(hit['_id'])
            article_ids.append(article_id)
        except ValueError:
            print(f"Failed to convert _id {hit['_id']} to int. Skipping.")
            non_integer_ids.append(hit['_id'])

    print(non_integer_ids)
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
    result = es.search(index='articls2', body=body) # type: ignore
    article_ids = []
    non_integer_ids = []
    for hit in result['hits']['hits']:
        try:
            article_id = int(hit['_id'])
            article_ids.append(article_id)
        except ValueError:
            print(f"Failed to convert _id {hit['_id']} to int. Skipping.")
            non_integer_ids.append(hit['_id'])
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
    result = es.search(index='articls2', body=body) # type: ignore
    print(result)
    article_ids = []
    non_integer_ids = []
    for hit in result['hits']['hits']:
        try:
            article_id = int(hit['_id'])
            article_ids.append(article_id)
        except ValueError:
            print(f"Failed to convert _id {hit['_id']} to int. Skipping.")
            non_integer_ids.append(hit['_id'])
    articles = Article.objects.filter(pk__in=article_ids)
    serializer = topicSerializer(articles, many=True)
    articles_count = articles.count()
    context ={'query':query,
              'articles_count':articles_count,
              'results':serializer.data}
    return Response(context, status=status.HTTP_200_OK)

# @csrf_exempt
# @api_view(['POST'])
# def add_article(request):
#     try:
#        
#         data = json.loads(request.body.decode('utf-8'))
#         new_article = Article.objects.create(
#             publicationDate=data.get('publicationDate'),
#             title=data.get('title'),
#             content=MetaData(
#                 tilte=data.get('content').get('tilte'),
#                 fullText=data.get('content').get('fullText'),
#                 abstruct=data.get('content').get('abstruct')
#                 
#             )
#         )

#         index_article(new_article)

#         response_data = {
#             'success': True,
#             'message': 'Article ajouté avec succès.',
#             'article_id': new_article.id
#         }
#         return JsonResponse(response_data)

#     except Exception as e:
#  
#         response_data = {
#             'success': False,
#             'message': f'Erreur lors de l\'ajout de l\'article : {str(e)}'
#         }
#         return JsonResponse(response_data, status=500)







# # @api_view(['GET'])
# # def getRoutes(request):
# #     routes = [
# #         'GET /api/rooms',
# #         'GET /api/rooms/:id'
# #     ]
# #     return Response(routes)

# # @api_view(['GET'])
# # def getData(request):
# #     topic = Topic.objects.all()
# #     serializer = topicSerializer(topic ,many=True)
# #     return Response(serializer.data)

# # @api_view(['POST'])
# # def addData(request):
# #     serializer = topicSerializer(data = request.data)
# #     if serializer.is_valid():
# #         serializer.save()
# #     return Response(serializer.data)

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




