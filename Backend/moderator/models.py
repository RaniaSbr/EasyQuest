import uuid
from sqlite3 import IntegrityError
from django.contrib.auth.hashers import make_password, get_random_string
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

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
Represents a Moderator Manager Controller in the system.

Class Name : ModeratorManager

Methods:
    -  create_moderator(self, email, psd=None, **extra_fields) : Creates a New Instance of a Moderator

Inheritance:
    - This class inherits from Django's `BaseUserManager` class.

Usage Example: 
    -Moderator.objects.create_moderator(email='abc@abc.com', psd='secure_password',
                                        first_name='Issam', last_name='Man'):
Relationships:
- No direct relationships with other models.
"""


class ModeratorManager(BaseUserManager):
    def create_moderator(self, email, psd=None, **extra_fields):
        try:
            if not email:
                raise ValueError('The Email field must be set')

            email = self.normalize_email(email)
            moderator = self.model(email=email, **extra_fields)
            moderator.set_password(psd)
            moderator.save(using=self._db)
            return moderator
        except IntegrityError as e:

            raise ValueError('Email address must be unique') from e


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

    objects = ModeratorManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'password']

    def __str__(self):
        return self.email
