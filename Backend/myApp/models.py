
from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from myApp.Admin.user_index import UserIndex

class YourModel(models.Model):
    field1 = models.CharField(max_length=100)
    field2 = models.TextField()

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255)

    def __str__(self):
        return self.username

class UserIndex(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
@receiver(post_save, sender=UserIndex)
def update_index(sender, instance, **kwargs):
    instance.search_index.update()

@receiver(post_delete, sender=UserIndex)
def delete_index(sender, instance, **kwargs):
    instance.search_index.delete(ignore=404)


class Moderateur(models.Model):
  
    username =models.CharField( max_length=50)
    email=models.CharField( max_length=50)
    
    class Meta:
        db_table="moderateur"  