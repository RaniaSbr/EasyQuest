from django.db import models 
from django.contrib.auth.models import User,AbstractUser
from article.models import Article
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
    