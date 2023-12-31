<<<<<<< HEAD

=======
from elasticsearch_dsl import Search
from datetime import datetime
from elasticsearch.exceptions import *


from constants import ARTICLE_INDEX
from filters.filters import *

from elasticsearch_dsl import connections




connections.create_connection(
    hosts=['https://localhost:9200'],
    alias='default',
    verify_certs=False,

    http_auth=('elastic', 'DuF83ML=V2nOIp0hVDpj')
)

# Now you can use the 'default' alias in your Search instance
search = Search(index=ARTICLE_INDEX)

# Example usage of filters
keywords_filter = KeywordsFilter()
authors_filter = AuthorsFilter()
institutions_filter = InstitutionsFilter()
date_range_filter = DateRangeFilter()

# Example values for testing
keywords = ['configuration management', 'continuous testing', 'blockchain in conservation', 'decentralized finance (defi)']

authors = ['Adel Lahsasna', 'Chetanya Puri', 'luca saba']
institutions = 'Austin Peay State University'
period = [datetime(2022, 1, 1), datetime(2023, 12, 31)]

# Apply filters to the search
search = keywords_filter.filter(search, keywords)
search = authors_filter.filter(search, authors)
search = institutions_filter.filter(search, institutions)
search = date_range_filter.filter(search, period)

# Execute the search
try:
    response = search.execute()
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

# Access the search results
for hit in response:
    print(50*'---')
    print(hit.id)
    print(hit.institutions)
    print(hit.publication_date)
    print(hit.keywords)
    print(hit.authors)
    print(50 * '---')
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
