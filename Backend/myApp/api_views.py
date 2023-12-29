

from rest_framework.views import APIView
from rest_framework.response import Response
from elasticsearch_dsl import Search
from myApp.Admin.user_index import UserIndexIndex, UserIndex
from myApp.models import User


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



import logging

class IndexUserAPIView(APIView):
    def get(self, request):
        # Fetch data from your MySQL database using Django models
        user_data = User.objects.values('id', 'username', 'email')

        # Index data in Elasticsearch
        for result in user_data:
            user_id = result['id']
            # Log relevant information
            logging.info(f"Indexing user with ID: {user_id}")
            # Check if the document already exists in Elasticsearch
            existing_doc = UserIndex.get(id=user_id, index=UserIndexIndex.name, ignore=404)

            if existing_doc:
                # If document exists, update it
                existing_doc.update(**result)
            else:
                # If not, create a new document
                user_doc = UserIndex(**result)
                user_doc.save(index=UserIndexIndex.name)

        return Response({'message': 'User data indexed successfully!'})
