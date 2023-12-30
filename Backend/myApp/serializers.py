
from rest_framework import serializers
from .models import YourModel
from .models import User , Moderateur

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ModSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moderateur
        fields = '__all__'

