
#ar*==+FV5XfBWpjwDy1p
from elasticsearch import Elasticsearch

es = Elasticsearch("http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200")
print(es.ping()) 


index_settings = {
    "settings": {
        "number_of_shards": 3,
        "number_of_replicas": 1
    },
    "mappings": {
        "properties": {
            "content": {
                "properties": {
                    "tilte": {"type": "text"},
                    "fullText": {"type": "text"},
                    "abstruct": {"type": "text"},
                    "KeyWords": {"type": "text"},
                    "autors": {"type": "text"},
                    "institution": {"type": "text"},
                    "refrences": {"type": "text"}
                }
            }
        }
    }
}

es.indices.create(index='articls4', body=index_settings) # type: ignore
# Obtient des informations sur l'index créé
index_info = es.indices.get(index="articls4")

print(index_info)