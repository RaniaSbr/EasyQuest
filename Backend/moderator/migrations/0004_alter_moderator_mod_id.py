# Generated by Django 5.0 on 2023-12-26 19:31

import moderator.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("moderator", "0003_moderator_mod_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="moderator",
            name="mod_id",
            field=models.UUIDField(
                default=moderator.models.ModAttributesUtil.generate_unique_mod_id,
                editable=False,
                unique=True,
            ),
        ),
    ]