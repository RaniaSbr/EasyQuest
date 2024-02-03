import re
from enum import Enum
from dotenv import load_dotenv
from elasticsearch_dsl import connections
from elasticsearch import Elasticsearch
import os
from elasticsearch.exceptions import *


class EmailValidator:
    @staticmethod
    def is_valid_email(email):
        email_pattern = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
        match = email_pattern.match(email)
        return bool(match)


class PasswordError(Enum):
    LENGTH_TOO_SHORT = "Password length is too short."
    NO_UPPERCASE = "Password must contain at least one uppercase letter."
    NO_LOWERCASE = "Password must contain at least one lowercase letter."
    NO_DIGIT = "Password must contain at least one digit."
    NO_SPECIAL_CHAR = "Password must contain at least one special character."
    COMMON_PATTERN = "Password is a common pattern or easily guessable."
    NAME_IN_PASSWORD = "Password cannot contain your first name, last name, or email name."


class PasswordValidator:
    @staticmethod
    def validate_password(password, first_name, last_name, email_name):
        if len(password) < 12:
            return PasswordError.LENGTH_TOO_SHORT

        if not any(char.isupper() for char in password):
            return PasswordError.NO_UPPERCASE

        if not any(char.islower() for char in password):
            return PasswordError.NO_LOWERCASE

        if not any(char.isdigit() for char in password):
            return PasswordError.NO_DIGIT

        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            return PasswordError.NO_SPECIAL_CHAR

        common_patterns = ["123456", "123456789", "password", "12345", "qwerty", "123", "1q2w3e", "12345678",
                           "111111", "1234567890", first_name, last_name, email_name]
        for pattern in common_patterns:
            print(pattern)
        if any(pattern.lower() in password.lower() for pattern in common_patterns):
            return PasswordError.COMMON_PATTERN

        return None


class ElasticSearchUtil:
    def __init__(self):
        load_dotenv()

        self.url = os.environ.get('URL')
        self.port = os.environ.get('PORT')
        self.user_name = os.environ.get("USER_NAME")
        self.user_pass = os.environ.get("USER_PASSWORD")
        self.article_index = os.environ.get("ARTICLE_INDEX")

    def get_elasticsearch_connection(self):
        try:
            connections.create_connection(
                hosts=[f'{self.url}:{self.port}'],
                alias='default',
                verify_certs=False,
                http_auth=(self.user_name, self.user_pass)
            )
        except ConnectionError as ce:
            print(f"ConnectionError: {ce}")
        except AuthenticationException as ae:
            print(f"AuthenticationException: {ae}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

    def create_elasticsearch_instance(self):
        try:

            es = Elasticsearch(verify_certs=False, basic_auth=(self.user_name, self.user_pass),
                               hosts=[f'{self.url}:{self.port}'])

            return es
        except Exception as e:
            raise ConnectionError(f"An unexpected error occurred while creating Elasticsearch instance")
