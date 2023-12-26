
from django.db import models

class YourModel(models.Model):
    field1 = models.CharField(max_length=100)
    field2 = models.TextField()
    
   # class Meta:
   #     db_table="myapp_yourmodel"  
