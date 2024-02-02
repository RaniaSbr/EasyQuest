from django.urls import path
from .views import *

urlpatterns = [
    path('references/', ReferenceListCreateView.as_view(), name='reference-list-create'),
    path('authors/', AuthorListCreateView.as_view(), name='author-list-create'),
    path('institutions/', InstitutionListCreateView.as_view(), name='institution-list-create'),
    path('metadata/', MetaDataListCreateView.as_view(), name='metadata-list-create'),
    path('articles/', ArticleListCreateView.as_view(), name='article-list-create'),
    path('up_articles/', UnPublishedArticleListCreateView.as_view(), name='up_article-list-create'),
    path('search_api/', search_api, name='filter'),
    path('up_article/<int:pk>/', UnPublishedArticleDetailView.as_view({'get': 'retrieve'}), name='article-detail'),
    path('up_article/delete/<int:pk>/', UnPublishedArticleDetailView.as_view({'delete': 'destroy'}),
         name='article_delete'),
    path('up_article/update/<int:pk>/', UnPublishedArticleDetailView.as_view({'put': 'update'}),
         name='article_update'),
    path('unpublished_article/validate_article/<int:pk>/',
         UnPublishedArticleDetailView.as_view({'delete': 'validate'}),
         name='article_validate'),
    path('up_article/serve-unpublished-article-pdf/<int:pk>/',
         UnPublishedArticleDetailView.as_view({'get': 'serve_unpublished_article_pdf'})
         , name='serve_unpublished_article_pdf'),
]
