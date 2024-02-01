import json

from .models import UnPublishedArticle, Author, Institution, Reference, MetaData
import logging
from datetime import datetime


class CreateArticleUtil:
    logger = logging.getLogger(__name__)

    @staticmethod
    def create_article_from_json(data, article_file):

        try:
            if not data.get("success", True):
                print(data)
                return data
            meta_data_instance = CreateArticleUtil._create_meta_data(data)
            for author_data in data['authors_full_names']:
                result = CreateArticleUtil._create_author({'name': author_data})
                if result["success"]:
                    meta_data_instance.authors.add(result["data"])

            for institution_data in data['institutions']:

                result = CreateArticleUtil._create_institution(institution_data)
                if result["success"]:
                    meta_data_instance.institutions.add(result["data"])

            for reference_data in data['references']:
                result = CreateArticleUtil._create_reference(reference_data)
                if result["success"]:
                    meta_data_instance.references.add(result["data"])
            print("hello")
            article_instance = UnPublishedArticle.objects.create(
                meta_data=meta_data_instance,
                pdf_file=article_file
            )

            article_instance.save()

            return {'success': True, 'message': 'Article created successfully'}

        except KeyError as e:
            print(e)
            CreateArticleUtil.logger.error(f'Missing key in JSON data: {str(e)}')
            return {'success': False, 'message': f'Missing key in JSON data: {str(e)}'}
        except Exception as e:
            print(e)
            CreateArticleUtil.logger.error(f'Error creating article: {str(e)}')
            return {'success': False, 'message': f'Error creating article: {str(e)}'}

    @staticmethod
    def _create_meta_data(json_data):
        return MetaData.objects.create(
            doi=json_data.get('doi', ''),
            title=json_data.get('article_title', ''),
            pub_date=datetime.today(),
            abstract=json_data.get('abstract', '')
        )

    @staticmethod
    def _create_author(author_data):

        full_name = author_data['name']

        existing_author = Author.objects.filter(name=full_name).first()
        new_author = Author(name=full_name)

        if existing_author is None:
            new_author.save()
            return {'success': True, 'message': f"Author '{full_name}' added.", 'data': new_author}
        else:
            return {'success': True, 'message': f"Author '{full_name}' already exist.", 'data': existing_author}

    @staticmethod
    def _create_institution(institution_data):
        data = json.loads(institution_data)
        existing_institution = Institution.objects.filter(
            department=data.get('college', {}).get('department', 'None'),
            name=data.get('college', {}).get('institution', 'None'),
            address=data.get('college', {}).get('address', 'None'),
            post_code=data.get('college', {}).get('post_code', 'None'),
            country=data.get('college', {}).get('country', 'None')
        ).first()
        new_institution = Institution.objects.create(
            department=data.get('college', {}).get('department', 'None'),
            name=data.get('college', {}).get('institution', 'None'),
            address=data.get('college', {}).get('address', 'None'),
            post_code=data.get('college', {}).get('post_code', 'None'),
            country=data.get('college', {}).get('country', 'None')
        )
        if existing_institution is None:
            return {'success': True, 'message': f"institution '{new_institution}' added.", 'data': new_institution}
        else:
            return {'success': True, 'message': f"institution already exist.", 'data': new_institution}

    @staticmethod
    def _create_reference(reference_data):
        existing_reference = Reference.objects.filter(article_title=reference_data['title']).first()

        if existing_reference:
            return {'success': True, 'message': f"reference already exist.", 'data': existing_reference}

        reference_instance = Reference.objects.create(
            publication_year=reference_data['published_date'],
            article_title=reference_data['title'],
            reference_id=reference_data['reference_id'],
            volume=reference_data['volume'],
            raw_text=reference_data['raw_text']
        )

        for author_data in reference_data['authors']:
            result = CreateArticleUtil._create_author({'name': author_data})
            if result["success"]:
                reference_instance.authors.add(result["data"])

        return {'success': True, 'message': f"Reference Created.", 'data': reference_instance}
