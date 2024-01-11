from elasticsearch import Elasticsearch
from UserPart.models import Article  


es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")


def index_article(article):

    article_data = {
        "content": {
            "tilte": article.content.tilte,
            "fullText": article.content.fullText,
            "abstruct": article.content.abstruct,
            "KeyWords": [kw.name for kw in article.content.KeyWords.all()],
            "autors": [author.name for author in article.content.autors.all()],
            "institution": [institution.name for institution in article.content.institution.all()],
            "refrences": [
                {"publicationDate": ref.publicationDate, "title": ref.title or ""}
                for ref in article.content.refrences.all()
            ]
        }
    }

   
    es.index(index='articls1', body=article_data) # type: ignore

def index_all_articles():
    es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")
    all_articles = Article.objects.all()
    for article in all_articles:
        index_article(article) 


index_all_articles()