from rest_framework import generics
from rest_framework.response import Response
from .serializers import ModeratorSerializer
from .models import Moderator
from rest_framework import status
from .util import *

request_data_json = ['first_name', 'last_name', 'email', 'password']


class ModeratorListCreateView(generics.ListCreateAPIView):
    queryset = Moderator.objects.all()
    serializer_class = ModeratorSerializer


class ModeratorUpdateView(generics.RetrieveDestroyAPIView):
    queryset = Moderator.objects.all()
    serializer_class = ModeratorSerializer


class ModeratorCreate(generics.CreateAPIView):
    queryset = Moderator.objects.all()
    serializer_class = ModeratorSerializer

    def create(self, request, *args, **kwargs):
        empty_fields = []
        for field in request_data_json:
            if not request.data.get(field):
                empty_fields.append(field)
        if empty_fields:
            return Response({'error': f'Missing required fields: {empty_fields}'}, status=status.HTTP_400_BAD_REQUEST)

        first_name = request.data.get(request_data_json[0])
        last_name = request.data.get(request_data_json[1])
        email = request.data.get(request_data_json[2])
        if not EmailValidator.is_valid_email(email):
            return Response({'error': 'Invalid email format'}, status=status.HTTP_400_BAD_REQUEST)
        password = request.data.get(request_data_json[3])
        pass_error = PasswordValidator.validate_password(password, first_name, last_name, str(email).split('@')[0])
        if pass_error:
            return Response({'error': pass_error}, status=status.HTTP_400_BAD_REQUEST)

        new_moderator = Moderator.objects.create_moderator(email=email, psd=password,
                                                           first_name=first_name, last_name=last_name)
        serializer = self.get_serializer(new_moderator)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
