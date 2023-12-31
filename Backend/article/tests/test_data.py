import os

from django_elasticsearch_dsl.search import Search
from elasticsearch_dsl.connections import connections

from Backend.article.documents import ArticleDocument
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Backend.settings")

django.setup()


def create_data():
    data = [
        {
            "title": "Introduction to Python",
            "fullText": "This is the content of the first article about Python.",
            "abstract": "A brief introduction to Python programming.",
            "author_name": "John Doe",
            "keywords": [{"name": "Python"}],
            "authors": [{"name": "John Doe"}],
            "institutions": [{"name": "University A"}],
            "references": [{"title": "Reference 1"}]
        },
        {
            "title": "Django Web Development",
            "fullText": "Content of the article on Django web development.",
            "abstract": "An overview of Django framework for web development.",
            "author_name": "Jane Smith",
            "keywords": [{"name": "Django"}],
            "authors": [{"name": "Jane Smith"}],
            "institutions": [{"name": "Company B"}],
            "references": [{"title": "Reference 2"}]
        }
    ]
    for article in data:
        ArticleDocument(
            title=article["title"],
            content=article["content"],
            author=article["author"],
            publication_date=article["publication_date"],
        ).save()


create_data()
# Define the Elasticsearch connection
connections.create_connection(hosts=['localhost'], timeout=20)

# Define the search index
index_name = 'articles'


# Define a simple search query
def search_titles(query):
    search = Search(index=index_name).query('match', title=query)
    response = search.execute()
    return response.hits


# Test the search with a query
results = search_titles('Python')

# Print the results
for hit in results:
    print(f"Title: {hit.title}, Author: {hit.author_name}, Keywords: {hit.keywords}, Score: {hit.meta.score}")
