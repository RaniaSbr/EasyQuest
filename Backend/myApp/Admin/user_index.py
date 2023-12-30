from elasticsearch_dsl import Document, Text, Index

class UserIndex(Document):
    username = Text()
    email = Text()

class UserIndexIndex(Index):
    name = 'user_index'
