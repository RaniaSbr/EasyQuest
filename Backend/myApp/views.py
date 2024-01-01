
from .models import Moderateur
from rest_framework import viewsets 
from django.contrib.auth.hashers import make_password
import secrets
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ModSerializer
from django.contrib.auth.hashers import check_password  # Import the check_password function
from rest_framework.decorators import action


class ModViewSet(viewsets.ModelViewSet):
    queryset = Moderateur.objects.all()
    serializer_class = ModSerializer

    def create(self, request, *args, **kwargs):
        # Generate a 12-character random password
        generated_password = secrets.token_urlsafe(8)  # 8 characteres password generated 
        #hashed_password = make_password(generated_password) # hash the password to stock it 
        hashed_password = generated_password
        user = Moderateur.objects.create(
            username=request.data['username'],
            email=request.data['email'],
            password=hashed_password
        )

        serializer = ModSerializer(user)

        return Response(serializer.data)

class ModerateurManager(viewsets.ModelViewSet):
    queryset = Moderateur.objects.all()
    serializer_class = ModSerializer

    def get_mod_list(self, request):
        moderators = Moderateur.objects.all()
        serializer = ModSerializer(moderators, many=True)
        return Response(serializer.data)
    
    def destroy(self, request, pk=None):
        try:
            moderator = Moderateur.objects.get(pk=pk)
            moderator.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Moderateur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'])
    def show_passwords(self, request, pk=None):
        try:
            moderator = Moderateur.objects.get(pk=pk)
            serialized_data = ModSerializer(moderator).data
            serialized_data['real_password'] = moderator.password
            return Response(serialized_data)
        except Moderateur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    def update(self, request, pk=None):
        try:
            moderator = Moderateur.objects.get(pk=pk)
            serializer = ModSerializer(moderator, data=request.data)
            if serializer.is_valid():
               serializer.save()
               return Response(serializer.data)
            else:
               print(serializer.errors)  #
               return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Moderateur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
