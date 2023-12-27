# Generated by Django 5.0 on 2023-12-26 17:25

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("moderator", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="moderator",
            name="user",
        ),
        migrations.AddField(
            model_name="moderator",
            name="email",
            field=models.EmailField(default="ex@gil.com", max_length=254, unique=True),
        ),
        migrations.AddField(
            model_name="moderator",
            name="first_name",
            field=models.CharField(default="mod", max_length=255),
        ),
        migrations.AddField(
            model_name="moderator",
            name="last_name",
            field=models.CharField(default="mod", max_length=255),
        ),
        migrations.AddField(
            model_name="moderator",
            name="password",
            field=models.CharField(default="Cc0eUiQioo6g9CFPwNIn", max_length=255),
        ),
        migrations.AlterField(
            model_name="moderator",
            name="mod_id",
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]
