
from rest_framework import serializers

from .models import  Moderateur

class ModSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moderateur
        fields = '__all__'

    extra_kwargs = {
        'password': {'write_only': True},  # Exclude password from validation during updates
    }
