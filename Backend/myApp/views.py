from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from rest_framework import generics
from myApp.Admin.user_index import UserIndex, UserIndexIndex



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


''''
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['POST'])
def create_your_model(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user_instance = serializer.save()

        # Automatically index the user in Elasticsearch
        user_data = {
            'id': user_instance.id,
            'username': user_instance.username,
            'email': user_instance.email
        }

        # Log relevant information
        logging.info(f"Indexing user with ID: {user_data['id']}")
        logging.info(f"User data before indexing: {user_data}")

        # Index data in Elasticsearch
        user_doc = UserIndex(**user_data)
        user_doc.save(index=UserIndexIndex.name)
        logging.info(f"Elasticsearch response after indexing: {user_doc.to_dict()}")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
'''