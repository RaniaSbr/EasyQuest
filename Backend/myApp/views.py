from django.shortcuts import render ,redirect
from rest_framework.response import Response
from rest_framework import status
from .models import User ,Moderateur
from .serializers import UserSerializer , ModSerializer
from rest_framework import generics
from myApp.Admin.user_index import UserIndex, UserIndexIndex
from django.http import HttpResponse
from rest_framework import viewsets 
 


class  ModViewSet(viewsets.ModelViewSet):
    queryset = Moderateur.objects.all()
    serializer_class =  ModSerializer

    def create(self, request, *args, **kwargs):
        # Assuming that 'name' and 'email' are part of the request data
        user = Moderateur.objects.create(username=request.data['username'], email=request.data['email'])

        # Serialize the created user to include the UID (id field)
        serializer =  ModSerializer(user)

        return Response(serializer.data)


class ReadModerateur(viewsets.ModelViewSet):
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

