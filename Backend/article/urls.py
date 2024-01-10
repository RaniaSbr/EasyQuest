from django.urls import path
from .views import MetaDataListCreateView, ReferenceListCreateView, AuthorListCreateView, \
    InstitutionListCreateView, ArticleListCreateView, search_api

urlpatterns = [
    path('references/', ReferenceListCreateView.as_view(), name='reference-list-create'),
    path('authors/', AuthorListCreateView.as_view(), name='author-list-create'),
    path('institutions/', InstitutionListCreateView.as_view(), name='institution-list-create'),
    path('metadata/', MetaDataListCreateView.as_view(), name='metadata-list-create'),
    path('articles/', ArticleListCreateView.as_view(), name='article-list-create'),
    path('search_api/', search_api, name='filter'),
]
