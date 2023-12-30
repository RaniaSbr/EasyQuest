from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .models import User ,Moderateur
from .serializers import UserSerializer , ModSerializer
from rest_framework import generics
from myApp.Admin.user_index import UserIndex, UserIndexIndex
from django.http import HttpResponse
from rest_framework import viewsets 


class CreateModerator(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # Additional code to index the user in Elasticsearch
        user_instance = serializer.instance
        user_data = {
            'id': user_instance.id,
            'username': user_instance.username,
            'email': user_instance.email
        }
        user_doc = UserIndex(**user_data)
        user_doc.save(index=UserIndexIndex.name)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)




 
    


class  ModViewSet(viewsets.ModelViewSet):
    queryset = Moderateur.objects.all()
    serializer_class =  ModSerializer

    def create(self, request, *args, **kwargs):
        # Assuming that 'name' and 'email' are part of the request data
        user = Moderateur.objects.create(username=request.data['username'], email=request.data['email'])

        # Serialize the created user to include the UID (id field)
        serializer =  ModSerializer(user)

        return Response(serializer.data)
