# Generated by Django 5.0 on 2023-12-26 18:04

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("moderator", "0008_moderator_mod_id_alter_moderator_email_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="moderator",
            name="mod_id",
            field=models.UUIDField(
                default=uuid.UUID("fccfd345-4676-4096-b969-f9e04e66f801"),
                editable=False,
                unique=True,
            ),
        ),
        migrations.AlterField(
            model_name="moderator",
            name="password",
            field=models.CharField(
                default="pbkdf2_sha256$720000$bPmDFs8Qfy0Uzpz5cjtO3b$jlUuZA/GfHwWUhcClPihiCe/c5+Lo/oubOPjY9eE0MM=",
                max_length=255,
            ),
        ),
    ]
