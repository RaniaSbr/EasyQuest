from django.urls import path
from . import views
   
urlpatterns = [   
    path('get-articles/',views.getArlicles),
    path("search-articles/",views.search_articles),
    path("search-articles-autors/",views.search_articles_autors),
    path("search-articles-keywords/",views.search_articles_keywords),
    path("search-articles-institution/",views.search_articles_institution),
    path("search-articles-refrences/",views.search_articles_refrences),
    path("search-api/",views.search_api),
]