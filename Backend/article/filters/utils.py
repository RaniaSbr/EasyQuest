<<<<<<< HEAD
<<<<<<< HEAD
import os
from elasticsearch.exceptions import *
from elasticsearch_dsl import Search, connections

from .filters import KeywordsFilter, AuthorsFilter, InstitutionsFilter, DateRangeFilter
from ..Exceptions import DataQueryInputIsNotList
from ..constants import ARTICLE_KEYS
from Backend.util import ElasticSearchUtil

=======
from elasticsearch_dsl import Search, connections
from .filters import KeywordsFilter, AuthorsFilter, InstitutionsFilter, DateRangeFilter
from elasticsearch.exceptions import *
=======
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
import os

<<<<<<< HEAD
<<<<<<< HEAD
load_dotenv()
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
=======
from dotenv import load_dotenv
from elasticsearch.exceptions import *
from elasticsearch_dsl import Search, connections

from .filters import KeywordsFilter, AuthorsFilter, InstitutionsFilter, DateRangeFilter
from ..Exceptions import DataQueryInputIsNotList
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
from ..constants import ARTICLE_KEYS

>>>>>>> 4fe85a8e (added articles json keys constant)

class FilterUtil:
    @staticmethod
    def apply_filter(filters_json):
<<<<<<< HEAD
<<<<<<< HEAD
        ElasticSearchUtil.get_elasticsearch_connection()

        article_index = os.environ.get("ARTICLE_INDEX")
        search = Search(index=article_index)
=======
=======
        load_dotenv()
>>>>>>> 4fe85a8e (added articles json keys constant)
        url = os.environ.get('URL')
        port = os.environ.get('PORT')
        user_name = os.environ.get("USER_NAME")
        user_pass = os.environ.get("USER_PASSWORD")
        article_index = os.environ.get("ARTICLE_INDEX")

        try:
            connections.create_connection(
                hosts=[f'{url}:{port}'],
                alias='default',
                verify_certs=False,
                http_auth=(user_name, user_pass)
            )
        except ConnectionError as ce:
            print(f"ConnectionError: {ce}")
        except AuthenticationException as ae:
            print(f"AuthenticationException: {ae}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

<<<<<<< HEAD
        search = Search(index=ARTICLE_INDEX)
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
        search = Search(index=article_index)
>>>>>>> 4fe85a8e (added articles json keys constant)

        keywords_filter = KeywordsFilter()
        authors_filter = AuthorsFilter()
        institutions_filter = InstitutionsFilter()
        date_range_filter = DateRangeFilter()
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
        if filters_json.get(ARTICLE_KEYS[2], []):
            search = keywords_filter.filter(search, filters_json.get(ARTICLE_KEYS[2], []))
        if filters_json.get(ARTICLE_KEYS[1], []):
            search = authors_filter.filter(search, filters_json.get(ARTICLE_KEYS[1], []))
        if filters_json.get(ARTICLE_KEYS[3], []):
            search = institutions_filter.filter(search, filters_json.get(ARTICLE_KEYS[3], []))
<<<<<<< HEAD
=======

        search = keywords_filter.filter(search, filters_json.get(ARTICLE_KEYS[2], []))
        search = authors_filter.filter(search, filters_json.get(ARTICLE_KEYS[1], []))
        search = institutions_filter.filter(search, filters_json.get(ARTICLE_KEYS[3], []))
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
        search = date_range_filter.filter(search, filters_json.get(ARTICLE_KEYS[4], []))

        try:
            response = search.execute()
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======

>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
            return response
        except ConnectionError as connection_error:
            print(f"ConnectionError: {connection_error}")
            return "Error: Unable to establish a connection to the Elasticsearch server."
        except SerializationError as serialization_error:
            print(f"SerializationError: {serialization_error}")
            return f"Error: Error in serializing or deserializing data for the Elasticsearch request/response."
        except NotFoundError as not_found_error:
            print(f"NotFoundError: {not_found_error}")
        except TransportError as transport_error:
            print(f"TransportError: {transport_error}")
            return f"Error: The requested data was not found in the Elasticsearch index."
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)


class InputIntegrity:
    @staticmethod
    def check_data(should_be_list):
        if not isinstance(should_be_list, list):
            raise DataQueryInputIsNotList(f"The Input Must Be A List; List : {should_be_list}")
        for element in should_be_list:
            if not element.isalpha():
                raise ValueError(f"Data Elements should only contain letters. Concerned Element : {element}")
<<<<<<< HEAD
=======
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
