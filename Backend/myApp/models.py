
from django.db import models




class Moderateur(models.Model):
  
    username =models.CharField( max_length=50)
    email=models.CharField( max_length=50)
    
    class Meta:
        db_table="moderateur"  