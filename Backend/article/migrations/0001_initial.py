<<<<<<< HEAD
<<<<<<< HEAD
# Generated by Django 5.0 on 2024-02-01 11:06
=======
# Generated by Django 5.0 on 2023-12-29 19:59
>>>>>>> MAHRAZABDELRAHMEN

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
<<<<<<< HEAD
                ('name', models.CharField(default='None', max_length=255)),
=======
                ('name', models.CharField(blank=True, max_length=80, null=True)),
>>>>>>> MAHRAZABDELRAHMEN
            ],
        ),
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
<<<<<<< HEAD
                ('department', models.CharField(default='None', max_length=255)),
                ('name', models.CharField(default='None', max_length=255)),
                ('address', models.TextField(default='None')),
                ('post_code', models.CharField(default='None', max_length=10)),
                ('country', models.CharField(default='None', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='MetaData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doi', models.CharField(default='None', max_length=255)),
                ('title', models.TextField(default='None')),
                ('pub_date', models.CharField(default='None', max_length=10)),
                ('keywords', models.TextField(default='[]')),
                ('abstract', models.TextField(default='None')),
                ('authors', models.ManyToManyField(to='article.author')),
                ('institutions', models.ManyToManyField(to='article.institution')),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pdf_file', models.FileField(null=True, upload_to='pdfs/')),
                ('meta_data', models.OneToOneField(default={}, on_delete=django.db.models.deletion.CASCADE, to='article.metadata')),
=======
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Keyword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
>>>>>>> MAHRAZABDELRAHMEN
            ],
        ),
        migrations.CreateModel(
            name='Reference',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
<<<<<<< HEAD
                ('publication_year', models.CharField(default='None', max_length=12)),
                ('article_title', models.TextField(default='None')),
                ('reference_id', models.TextField(default='None')),
                ('volume', models.CharField(default='None', max_length=10)),
                ('raw_text', models.CharField(default='NONE', max_length=256)),
                ('authors', models.ManyToManyField(related_name='references', to='article.author')),
            ],
        ),
        migrations.AddField(
            model_name='metadata',
            name='references',
            field=models.ManyToManyField(related_name='citations', to='article.reference'),
        ),
        migrations.CreateModel(
            name='UnPublishedArticle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pdf_file', models.FileField(null=True, upload_to='pdfs/')),
                ('meta_data', models.OneToOneField(default={}, on_delete=django.db.models.deletion.CASCADE, to='article.metadata')),
=======
                ('publicationDate', models.DateField()),
                ('title', models.TextField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='MetaData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('fullText', models.TextField()),
                ('abstract', models.TextField()),
                ('authors', models.ManyToManyField(to='article.author')),
                ('institutions', models.ManyToManyField(to='article.institution')),
                ('keywords', models.ManyToManyField(to='article.keyword')),
                ('references', models.ManyToManyField(to='article.reference')),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='article.metadata')),
>>>>>>> MAHRAZABDELRAHMEN
            ],
        ),
    ]
=======
>>>>>>> 362a0136 (added Article Index + Filter Function + Need to create the api)
