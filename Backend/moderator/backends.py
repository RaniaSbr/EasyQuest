from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import ObjectDoesNotExist

from .models import Moderator


class ModeratorBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            moderator = Moderator.objects.get(email=email)
        except ObjectDoesNotExist:
            return None

        if moderator.check_password(password):
            return moderator

    def get_user(self, user_id):
        try:
            return Moderator.objects.get(pk=user_id)
        except ObjectDoesNotExist:
            return None
