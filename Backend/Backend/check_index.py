from elasticsearch import Elasticsearch
from UserPart.models import Article
def check_indexed_articles(es):
    # Exécuter une requête pour récupérer tous les articles indexés
    result = es.search(index='articls', body={"query": {"match_all": {}}})

    # Récupérer les identifiants des articles
    article_ids = [hit['_id'] for hit in result['hits']['hits']]

    # Comparer avec les identifiants des articles dans votre base de données Django
    all_articles = Article.objects.all()
    all_article_ids = [str(article.id) for article in all_articles] # type: ignore

    # Vérifier si tous les articles de la base de données sont également dans Elasticsearch
    if set(all_article_ids) == set(article_ids):
        print("Tous les articles sont indexés avec succès dans Elasticsearch.")
    else:
        print("Certains articles ne sont pas indexés dans Elasticsearch.")

# Utilisez votre instance Elasticsearch
es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")

# Appelez la fonction pour vérifier les articles indexés
check_indexed_articles(es)
