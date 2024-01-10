from .models import Article, Author, Institution, Reference, MetaData


class CreateArticleUtil:

    @staticmethod
    def create_article_from_json(json_data, article_blob):
        try:
            article_instance = Article.objects.create(blob=article_blob)
            meta_data_instance = MetaData.objects.create(
                doi=json_data['doi'],
                title=json_data['title'],
                pub_date=json_data['pub_date']
            )

            # Create Authors for the Article
            for author_data in json_data['authors']:
                author_instance = Author.objects.create(
                    name=author_data['name'],
                    affiliations=', '.join(author_data['affiliations'])
                )
                meta_data_instance.authors.add(author_instance)

            # Create Institutions for the Article
            for institution_data in json_data['institutions']:
                institution_instance = Institution.objects.create(
                    id=institution_data['id'],
                    label=institution_data['label'],
                    name=institution_data['name'],
                    address=institution_data['address'],
                    country=institution_data['country']
                )
                meta_data_instance.institutions.add(institution_instance)

            # Create References for the Article
            for reference_data in json_data['references']:
                reference_instance = Reference.objects.create(
                    id=reference_data['id'],
                    year=reference_data['year'],
                    article_title=reference_data['article_title'],
                    source=reference_data['source'],
                    volume=reference_data['volume'],
                    pages=reference_data['pages']
                )

                for author_data in reference_data['authors']:
                    author_instance = Author.objects.create(
                        name=author_data['surname'] + ', ' + author_data['given_names']
                    )
                    reference_instance.authors.add(author_instance)

                meta_data_instance.references.add(reference_instance)

            article_instance.meta_data = meta_data_instance
            article_instance.save()
            return {'success': True, 'message': 'Article created successfully'}

        except KeyError as e:
            return {'success': False, 'message': f'Missing key in JSON data: {str(e)}'}
        except Exception as e:
            return {'success': False, 'message': f'Error creating article: {str(e)}'}
