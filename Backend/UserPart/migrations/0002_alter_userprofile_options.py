# Generated by Django 5.0 on 2024-02-03 04:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('UserPart', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userprofile',
            options={'permissions': [('Can access user pages', 'user_only_perm')]},
        ),
    ]
