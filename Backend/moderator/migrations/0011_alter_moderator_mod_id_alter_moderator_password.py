# Generated by Django 5.0 on 2023-12-26 18:34

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("moderator", "0010_alter_moderator_email_alter_moderator_first_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="moderator",
            name="mod_id",
            field=models.UUIDField(
                default=uuid.UUID("f91b4c1e-263f-4a31-afe2-7c7486c45298"),
                editable=False,
                unique=True,
            ),
        ),
        migrations.AlterField(
            model_name="moderator",
            name="password",
            field=models.CharField(
                default="pbkdf2_sha256$720000$vbK7uLyBv1Eudo05muJHg4$4avH63Xh48Sfx/GfK8I6svhRE8wOnB1rZYDNVKYfns0=",
                max_length=255,
            ),
        ),
    ]
