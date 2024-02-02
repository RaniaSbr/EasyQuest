<<<<<<< HEAD
from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'create', ModeratorManager, basename='moderator')

urlpatterns = [
    path('ModerateurManager/', ModeratorManager.as_view({'get': 'get_mod_list'}), name='moderateurs-list'),
    path('ModerateurManager/<int:pk>/', ModeratorManager.as_view({'delete': 'destroy'}), name='moderateur-detail'),
    path('ModerateurManager/show-password/<int:pk>/', ModeratorManager.as_view({'get': 'show_passwords'}),
         name='moderateur-show-password'),
    path('ModerateurManager/update/<int:pk>/', ModeratorManager.as_view({'put': 'update'}), name='moderateur-update'),
    path('', include(router.urls)),
=======
from django.urls import path
from .views import ModeratorListCreateView, ModeratorUpdateView, ModeratorCreate

urlpatterns = [
    path('mods/', ModeratorListCreateView.as_view(), name="moderator_list_create_view"),
    path('<int:pk>/', ModeratorUpdateView.as_view(), name='moderator-update'),
    path('create/', ModeratorCreate.as_view(), name="create"),
>>>>>>> MAHRAZABDELRAHMEN
]
