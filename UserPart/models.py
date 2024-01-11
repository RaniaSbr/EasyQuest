from django.db import models 
from django.contrib.auth.models import User,AbstractUser

class Refrence(models.Model):
    publicationDate = models.DateField()
    title = models.TextField(max_length=255)
    
    def __str__(self):
        return self.title
class Author(models.Model):
    name = models.CharField(max_length=80 ,null=True,blank=True)
    
    def __str__(self):
        return self.name
    
class KeyWord(models.Model):
    name = models.CharField(max_length=255)
   
class Institution(models.Model):
    name = models.CharField(max_length=50) 
    def __str__(self):
        return self.name
    
class MetaData(models.Model):
    tilte = models.CharField(max_length=255)
    fullText = models.TextField()
    abstruct  = models.TextField()
    KeyWords = models.ManyToManyField(KeyWord)
    autors = models.ManyToManyField(Author)
    institution = models.ManyToManyField(Institution)
    refrences = models.ManyToManyField(Refrence)
class Article(models.Model):
    content = models.OneToOneField(MetaData, on_delete=models.SET_NULL, null=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(Article, related_name='favorited_by', blank=True)
    
    def __str__(self):
        return self.user.username



    

    
#     def __str__(self):
#         return self.title
    
    




# # class Topic(models.Model):
# #     name = models.CharField(max_length=200)
    
# #     def __str__(self):
# #         return str(self.name)

# # class Room(models.Model):
# #     host = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
# #     topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True)
# #     name = models.CharField(max_length=200)
# #     description = models.TextField(null=True, blank=True)
# #     #participants=
# #     updated = models.DateTimeField(auto_now=True)
# #     create = models.DateTimeField(auto_now_add=True)
# #     class Meta:
# #         ordering = ['-updated']
# #     def __str__(self):
# #         return str(self.name)
    
# # class Message(models.Model):
# #     user =  models.ForeignKey(User, on_delete=models.CASCADE)
# #     room = models.ForeignKey(Room, on_delete=models.CASCADE)
# #     body = models.TextField()
# #     updated = models.DateTimeField(auto_now=True)
# #     create = models.DateTimeField(auto_now_add=True)
# #     def __str__(self):
# #         return str(self.body[0:50 ])
    