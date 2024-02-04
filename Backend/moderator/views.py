from django.core.exceptions import ObjectDoesNotExist
from Backend.util import *
from .serializers import *
import secrets
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.hashers import make_password

request_data_json = ['first_name', 'last_name', 'email']


class ModeratorManager(viewsets.ModelViewSet):
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
        password = secrets.token_urlsafe(8)
        #pass_error = PasswordValidator.validate_password(password, first_name, last_name, str(email).split('@')[0])
        #if pass_error:
        #    return Response({'error': pass_error}, status=status.HTTP_400_BAD_REQUEST)
        print('Here s the passwrod')
        print(password)
        
        
        new_moderator = Moderator.objects.create(email=email, password= make_password(password),
                                                           first_name=first_name, last_name=last_name)
        serializer = self.get_serializer(new_moderator)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @staticmethod
    def get_mod_list(request):
        moderators = Moderator.objects.all()
        serializer = ModeratorSerializer(moderators, many=True)
        return Response(serializer.data)

    def destroy(self, request, pk=None, *args):
        try:
            moderator = Moderator.objects.get(pk=pk)
            moderator.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'])
    def show_passwords(self , request , pk=None):
        try:
            moderator = Moderator.objects.get(pk=pk)
            serialized_data = ModeratorSerializer(moderator).data
            serialized_data['real_password'] = moderator.password
            return Response(serialized_data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None, *args):
        try:
            moderator = Moderator.objects.get(pk=pk)
            serializer = ModeratorSerializer(moderator, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                print(serializer.errors)  #
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

