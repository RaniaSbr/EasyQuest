

from rest_framework.views import APIView
from rest_framework.response import Response
from elasticsearch_dsl import Search
from myApp.Admin.user_index import UserIndexIndex, UserIndex
from myApp.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from elasticsearch_dsl import Search
from myApp.Admin.user_index import UserIndexIndex  # Adjust the import as needed

class SearchAPIView(APIView):
    def get(self, request):
        query = request.GET.get('q', '')

        # Directly pass the index name as a string
        s = Search(index=UserIndexIndex.name).query("multi_match", query=query, fields=['username', 'email'])

        response = s.execute()
        
        # Log the raw Elasticsearch response
        print(response.to_dict())

        results = [{'username': hit.username, 'email': hit.email} for hit in response.hits]
        return Response({'results': results})




class IndexUserAPIView(APIView):
    def get(self, request):
        # Fetch data from your MySQL database using Django models
        user_data = User.objects.values('id', 'username', 'email')

        # Index data in Elasticsearch
        for result in user_data:
            user_doc = UserIndex(**result)
            user_doc.save(index=UserIndexIndex.name)

        return Response({'message': 'User data indexed successfully!'})

