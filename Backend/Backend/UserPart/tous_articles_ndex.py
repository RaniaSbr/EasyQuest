from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
from django.db.models import F
from django.db.models.functions import Cast
from article.models import Article
from elasticsearch.helpers import BulkIndexError

# Connexion à Elasticsearch
es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")

# # Supprimez l'index existant dans Elasticsearch s'il existe
# es.indices.delete(index='articls1', ignore=[400, 404])# type: ignore

# # Créez un nouvel index
# es.indices.create(index='articls1', body={ # type: ignore
#     "settings": {
#         "number_of_shards": 3,
#         "number_of_replicas": 1
#     }
# })

# Obtenez tous les articles de la base de données
articles = Article.objects.all()

# Assurez-vous que les identifiants sont des entiers pour éviter des erreurs de filtrage
article_ids = [article.id for article in articles] # type: ignore

# Réindexez tous les articles depuis la base de données dans le nouvel index
bulk_data = []

for article in articles:
    article_data = {
        "_index": "articls4",
        "_id": str(article.id), # type: ignore
        "_source": {
            "content": {
                "tilte": article.content.tilte,# type: ignore
                "fullText": article.content.fullText,# type: ignore
                "abstruct": article.content.abstruct,# type: ignore
            }
        }
    }

    # Ajoutez KeyWords seulement s'il n'est pas vide
    keywords = [kw.name for kw in article.content.KeyWords.all()]# type: ignore
    if keywords:
        article_data["_source"]["content"]["KeyWords"] = keywords
    else:
        article_data["_source"]["content"]["KeyWords"] = ''

    autors = [author.name for author in article.content.autors.all()]# type: ignore
    if autors:
        article_data["_source"]["content"]["autors"] = autors
    else:
        article_data["_source"]["content"]["autors"] = ''

    institution = [institution.name for institution in article.content.institution.all()]# type: ignore
    if institution:
        article_data["_source"]["content"]["institution"] = institution
    else:
        article_data["_source"]["content"]["institution"] = ''

    refrences = [
        {"publicationDate": reference.publicationDate, "title": reference.title}
        for reference in article.content.refrences.all()# type: ignore
    ]
    if refrences:
        article_data["_source"]["content"]["refrences"] = refrences
    else:
        article_data["_source"]["content"]["refrences"] = ''

    bulk_data.append(article_data)

try:
    bulk(es, bulk_data)
    es.indices.refresh(index='articls4')
except BulkIndexError as e:
    for error in e.errors:
        print(f"Failed to index document with _id {error['index']['_id']}: {error['index']['error']['reason']}")
    raise

# Rafraîchissez l'index pour rendre les modifications visibles
es.indices.refresh(index='articls4')