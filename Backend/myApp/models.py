
from django.db import models

class Moderateur(models.Model):
  
    username =models.CharField( max_length=50)
    email= models.EmailField()
    password = models.CharField(max_length=128)
    def __str__(self):
      return self.username
   
    class Meta:
        db_table="moderators"  

class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    pdf_url = models.URLField()

    def __str__(self):
        return self.title
    class Meta:
        db_table="articles" 

    
    

        
        