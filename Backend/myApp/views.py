from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import YourModel
from .serializers import YourModelSerializer
from rest_framework import generics


class YourModelListCreateView(generics.ListCreateAPIView):
    queryset = YourModel.objects.all()
    serializer_class = YourModelSerializer



@api_view(['POST'])
def create_your_model(request):
    serializer = YourModelSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
