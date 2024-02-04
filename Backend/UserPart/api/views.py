from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from moderator.util import Token_moderator
from UserPart.models import UserProfile
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.hashers import check_password, make_password
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.authtoken.models import Token
from article.serializers import *
from elasticsearch_dsl.connections import connections
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from moderator.models import Moderator

connections.create_connection(alias='default', hosts=['http://elastic:ar*==+FV5XfBWpjwDy1p@localhost:9200'])


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def check_user_type(request):
    user = request.user
    user_profile = UserProfile.objects.get(user__email=user)
    if user_profile:
        return Response({'value': 1})
    user_profile = Moderator.objects.get(email=user)
    if user_profile:
        return Response({'value': 2})


@api_view(['POST'])
@csrf_protect
@csrf_exempt
def login_user(request):
    token = ' '
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
     user_profile = UserProfile.objects.get(user__username=username)
     user = authenticate(request, username=username, password=password)
     value = 1 
    
    except UserProfile.DoesNotExist:
       
        user_profile = Moderator.objects.get(email=username)
       
        if(user_profile is not None):
         
         
            user = authenticate(request, email= username, password=password)
            value = 2
        else:
            value = 3
            return Response({'error': 'Incorrect username or password.'}, status=status.HTTP_401_UNAUTHORIZED) ;
   
    token = ' '
    if user is not None:
        login(request, user)

        # Generate or retrieve the user's token
        if(value == 1):
            #user 
           token, created = Token.objects.get_or_create(user=user)
           token = str(token.key)
        
        else:
            if(value == 2):
            #moderateur
             token =  Token_moderator.generate_token_for_moderator(moderator_email=username)
            
        # You can include the token in the response if needed
        first_name = user.first_name
        last_name = user.last_name
        message = "Login successful"
        return Response({'message': message, 'type': user_type,
                         'token': str(token.key), 'first_name': first_name,
                         'last_name': last_name}, status=status.HTTP_200_OK)
    else:
        message = "Incorrect password"
        return Response({'error': message}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout_user(request):
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def check_user_type(request):
    user = request.user
    user_profile = UserProfile.objects.get(user__email=user)
    if user_profile:
        return Response({'value': 1})
    user_profile = Moderator.objects.get(email=user)
    if user_profile:
        return Response({'value': 2})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_username(request):
    new_username = request.data.get('new_username')
    user_profile = request.user.userprofile
    if not new_username:
        return Response({'message': 'New username is required'}, status=400)

    if User.objects.exclude(id=user_profile.id).filter(username=new_username).exists():
        return Response({'message': 'Username already exists for another user'}, status=400)

    user_profile.user.username = new_username
    user_profile.user.save()

    return Response({'message': 'Username updated successfully'}, status=200)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_password(request):
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')

    if not current_password or not new_password:
        return Response({'message': 'Current password and new password are required'}, status=400)

    user_profile = request.user.userprofile

    if not check_password(current_password, user_profile.user.password):
        return Response({'message': 'Incorrect current password'}, status=400)

    user_profile.user.set_password(new_password)
    user_profile.user.save()

    update_session_auth_hash(request, user_profile)

    return Response({'message': 'Password updated successfully'}, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def sign_up(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not first_name or not last_name or not email or not password:
        return Response({'error': 'All fields are required'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'User with this email already exists'}, status=400)
    #  password = make_password(password)
    user = User.objects.create_user(username=email, email=email, password=password, first_name=first_name,
                                    last_name=last_name)
    user_profile = UserProfile.objects.create(user=user)

    return Response({'message': 'User registered successfully'}, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_favorites(request):
    try:
        user_profile = request.user.userprofile
        print(request.user.userprofile)
    except ObjectDoesNotExist:
        return Response({'message': 'UserProfile not found'}, status=404)

    favorites_list = user_profile.favorites.all()
    print(favorites_list)
    serializer = ArticleSerializer(favorites_list, many=True)

    return Response({'favorites': serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_favorites(request, article_id):
    user_profile = request.user.userprofile

    article = get_object_or_404(Article, id=article_id)

    user_profile.favorites.add(article)

    favorites_list = user_profile.favorites.all()

    serializer = ArticleSerializer(favorites_list, many=True)

    return Response({'favorites': serializer.data, 'message': f'Article with ID {article_id} added to favorites'},
                    status=200)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_favorite(request, article_id):
    try:
        user_profile = request.user.userprofile
    except ObjectDoesNotExist:
        return Response({'message': 'UserProfile not found'}, status=404)

    article = get_object_or_404(Article, id=article_id)

    user_profile.favorites.remove(article)
    print(f'Article with ID {article_id} removed from favorites by user {request.user.username}')

    favorites_list = user_profile.favorites.all()
    print(favorites_list)
    serializer = ArticleSerializer(favorites_list, many=True)

    return Response({'favorites': serializer.data, 'message': f'Article with ID {article_id} removed from favorites'},
                    status=200)
