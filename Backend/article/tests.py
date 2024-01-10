from elasticsearch_dsl import Search
from datetime import datetime
from elasticsearch.exceptions import *
from filters.filters import *
from elasticsearch_dsl import connections
import os
from dotenv import load_dotenv

load_dotenv()
url = os.environ.get('URL')
port = os.environ.get('PORT')
user_name = os.environ.get("USER_NAME")
user_pass = os.environ.get("USER_PASSWORD")
article_index = os.environ.get("ARTICLE_INDEX")
connections.create_connection(
                hosts=[f'{url}:{port}'],
                alias='default',
                verify_certs=False,
                http_auth=(user_name, user_pass)
)
search = Search(index=article_index)

keywords_filter = KeywordsFilter()
authors_filter = AuthorsFilter()
institutions_filter = InstitutionsFilter()
date_range_filter = DateRangeFilter()


authors = ['Chetanya Puri']

period = [datetime(2022, 1, 1), datetime(2023, 12, 31)]

search = authors_filter.filter(search, authors)
search = date_range_filter.filter(search, period)

# Execute the search
try:
    response = search.execute()
    for hit in response:
        print(50 * '---')
        print(hit.id)
        print(hit.institutions)
        print(hit.publication_date)
        print(hit.keywords)
        print(hit.authors)
        print(50 * '---')

except ConnectionError as connection_error:
    print(f"ConnectionError: {connection_error}")
except SerializationError as serialization_error:
    print(f"SerializationError: {serialization_error}")
except NotFoundError as not_found_error:
    print(f"NotFoundError: {not_found_error}")
except TransportError as transport_error:
    print(f"TransportError: {transport_error}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
