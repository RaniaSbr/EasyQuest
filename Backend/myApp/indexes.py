
from django_elasticsearch_dsl.registries import registry
from django_elasticsearch_dsl import Document, Index ,fields
from .models import UserIndex
from .models import User

user_index = Index('user_index')

@user_index.doc_type
class UserDocument(Document):
    class Django:
        model = UserIndex
