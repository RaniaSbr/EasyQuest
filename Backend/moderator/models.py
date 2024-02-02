import uuid
from django.contrib.auth.hashers import make_password, get_random_string
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from Backend.permissions import MODS_ADMIN_NO_USER_PERM, MODS_PERMISSION

"""
Represents A Util for handling Moderator class attributes.

Class Name: ModAttributesUtil

Methods:
    - static uuid4 generate_unique_mod_id(void): generates a uuid4 as mod_id
    - static string password(void) : generates a hash random password

Inheritance:
    - This class does not inherit.

Usage Example: 
    - call ModAttributesUtil.generate_unique_mod_id() -> 83aad6d7-37eb-4c00-924d-ef7498d9528b
    
Relationships:
- Moderator Uses This Class for handling some of its attributes operations.
"""


class ModAttributesUtil:

    @staticmethod
    def generate_unique_mod_id():
        unique_id = uuid.uuid4()
        print("/" * 100)
        print(unique_id)
        return unique_id

    @staticmethod
    def password(length=30):
        return make_password(get_random_string(length))


"""
Represents a Moderator  in the system.

Class Name : Moderator

Methods:
    -  __str__(self) : returns the string value of an instance of a moderator

Inheritance:
    - This class inherits from Django's `AbstractBaseUser` class.


Relationships:
- No direct relationships with other models.
"""


class Moderator(AbstractBaseUser):
    first_name = models.CharField(max_length=255, default="mod")
    last_name = models.CharField(max_length=255, default="mod")
    email = models.EmailField(unique=True, default="abc@abc.com")
    mod_id = models.UUIDField(default=ModAttributesUtil.generate_unique_mod_id, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=255, default=ModAttributesUtil.password)
    objects = models.Manager()
    auth = "MODERATOR"
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'password']

    class Meta:
        permissions = [
            (MODS_PERMISSION, "mod_only_perm"),
            (MODS_ADMIN_NO_USER_PERM, "mod_admin_only"),
        ]

    def __str__(self):
        return self.email
