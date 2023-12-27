# Generated by Django 5.0 on 2023-12-26 17:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("moderator", "0002_remove_moderator_user_moderator_email_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="moderator",
            name="last_login",
            field=models.DateTimeField(
                blank=True, null=True, verbose_name="last login"
            ),
        ),
        migrations.AlterField(
            model_name="moderator",
            name="password",
            field=models.CharField(
                default="pbkdf2_sha256$720000$iewwUFASAxK3gbOpgEoKZP$b9ic9FhAQIEKPjONKJ440NZWsY2RNGJO2jyUMoeEew0=",
                max_length=255,
            ),
        ),
    ]
