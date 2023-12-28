from django.urls import path
from . import views

urlpatterns = [
    path('login/',views.login_user),
    path('logout/',views.logout_user),
    path('update-username/',views.update_username),
    path('update-password/',views.update_password),
    path('sign-up/',views.sign_up),
    path('favorite-list/',views.user_favorites),
    path('remove-favorite/<int:article_id>/',views.remove_favorite),
    path('add-favorite/<int:article_id>/',views.add_to_favorites),
    path('get-articles/',views.getArlicles),
    path("search-articles/",views.search_articles),
    path("search-articles-autors/",views.search_articles_autors),
    path("search-articles-keywords/",views.search_articles_keywords),
    path("search-articles-institution/",views.search_articles_institution),
    path("search-articles-refrences/",views.search_articles_refrences)
]




