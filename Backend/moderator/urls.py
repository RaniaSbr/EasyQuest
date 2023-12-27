from django.urls import path
from .views import ModeratorListCreateView, ModeratorUpdateView, ModeratorCreate

urlpatterns = [
    path('mods/', ModeratorListCreateView.as_view(), name="moderator_list_create_view"),
    path('<int:pk>/', ModeratorUpdateView.as_view(), name='moderator-update'),
    path('create/', ModeratorCreate.as_view(), name="create"),
]
