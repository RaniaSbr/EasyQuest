
import json
import requests
from bs4 import BeautifulSoup
from abc import ABC, abstractmethod


def return_valid_text_from_data(data):
    return data.text if data else "NONE"


class IExtractData(ABC):
    @abstractmethod
    def process_document(self, file_path):
        pass


class GrobidClient:
    def __init__(self, base_url):
        self.base_url = base_url

    def _make_request(self, endpoint, files, params=None, data=None):
        url = f"{self.base_url}/{endpoint}"

        try:
            response = requests.post(url, files=files, params=params, data=data)
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            print(f"Request to GROBID server FAILED!: {e}")
            return {'success': False, 'Message': e}


class ReferencesExtractor(GrobidClient, IExtractData):

    def process_document(self, file_path, include_raw_citations=True, ):
        endpoint = "api/processReferences"
        with open(file_path, "rb") as pdf_file:
            files = {'input': (file_path, pdf_file, 'application/pdf')}
            payload = {'includeRawCitations': 'true' if include_raw_citations else 'false'}
            response = self._make_request(endpoint, files, data=payload)
            if isinstance(response, dict):
                return response

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'xml')
            references = []
            for ref in soup.find_all('biblStruct'):
                authors = ref.find_all('persName')
                authors_full_names = [(f"{return_valid_text_from_data(author.forename)} "
                                       f"{return_valid_text_from_data(author.surname)}")
                                      for author in authors]
                reference_data = {
                    'raw_text':  return_valid_text_from_data(ref.find('note')),
                    'authors': authors_full_names,
                    'article_title': return_valid_text_from_data(ref.find('title')),
                    'reference_id': return_valid_text_from_data(ref.find('idno')),
                    'volume': return_valid_text_from_data(ref.find('biblScope', {'unit': 'volume'})),
                    'published_date': return_valid_text_from_data(ref.find('date', {'type': 'published'})),
                }
                references.append(reference_data)

            return {'references': references}
        else:
            print(f"Grobid request failed with status code {response.status_code}")
            return None


class HeaderExtractor(GrobidClient, IExtractData):
    def __init__(self, base_url):
        super().__init__(base_url)

    def process_document(self, file_path, consolidate_header=True):
        endpoint = "api/processHeaderDocument"
        with open(file_path, "rb") as pdf_file:
            payload = {'consolidateHeader': "1" if consolidate_header else "0"}
            files = {'input': (file_path, pdf_file, 'application/pdf')}
            response = self._make_request(endpoint, files, params=payload)
            if isinstance(response, dict):
                return response

        if response.status_code == 200:
            print(type(response.text))
            soup = BeautifulSoup(response.text, 'xml')
            print('9bel artcile ')
            article_title = return_valid_text_from_data(soup.find('title', type='main'))
            print('9bel auth ')
            authors = soup.find_all('persName')
            print('9bel auth fln ')
            authors_full_names = [(f"{return_valid_text_from_data(author.forename)}"
                                   f" {return_valid_text_from_data(author.surname)}") for author in authors]
            print('9bel abstra ')
            abstract = return_valid_text_from_data(soup.find('abstract'))
            institutions_list = []
            print('9bel for ')
            for affiliation in soup.find_all('affiliation'):
                department = return_valid_text_from_data(affiliation.find('orgName', {'type': 'department'}))
                institution = return_valid_text_from_data(affiliation.find('orgName', {'type': 'institution'}))
                post_code = return_valid_text_from_data(affiliation.find('postCode'))
                settlement = return_valid_text_from_data(affiliation.find('settlement'))
                country = return_valid_text_from_data(affiliation.find('country'))

                college_json = {
                    "college": {
                        "department": department,
                        "name": institution,
                        "post_code": post_code,
                        "settlement": settlement,
                        "country": country
                    }
                }
                institutions_list.append(college_json)
            print('9bel unique ')
            unique_affiliations = list({json.dumps(obj, sort_keys=True) for obj in institutions_list})
            print('mor unique ')
            keywords = soup.find_all('keywords')
            keywords_list = [return_valid_text_from_data(keyword) for keyword in keywords]

            return {
                'title': article_title,
                'authors': authors_full_names,
                'abstract': abstract,
                'institutions': unique_affiliations,
                'keywords_list': keywords_list,
                'doi': return_valid_text_from_data(soup.find('idno'))
            }
        else:
            print(f"Grobid request failed with status code {response.status_code}")
            return None


class PdfExtractionUtil:
    def __init__(self, pdf_path, document_extractor):
        """
        Initializes PdfExtractionUtil with the given PDF path and Grobid document extractor.

        Args:
            pdf_path (str): The path to the PDF file.
            document_extractor (DocumentExtractor): An instance of DocumentExtractor (ReferencesExtractor or
            HeaderExtractor).
        """
        self.pdf_path = pdf_path
        self.json_output = {}
        self.document_extractor = document_extractor

    def run(self, grobid_base_url):
        """
        Runs the PDF extraction process using Grobid.

        This method calls the process_document method of the DocumentExtractor, and then
        extracts relevant information from the processed document.

        Note: The extracted information is stored in self.json_output.
        """
     
        extractor = self.document_extractor(grobid_base_url)
        
        self.json_output = extractor.process_document(self.pdf_path)
        print('mor extractor2')

class PdfController:
    @staticmethod
    def process_and_store_pdf(pdf_path, blob):
        print('create util1111')
        server = "http://localhost:8070"
        print(' mor server')
        extraction_classes = [HeaderExtractor, ReferencesExtractor]
        final_json = {}
        for data in extraction_classes:
            print('dkhel for')
            pdf_util = PdfExtractionUtil(pdf_path, document_extractor=data)
            print(' 9bel util.run')

            pdf_util.run(server)
            print('util.run')
            extracted_data = pdf_util.json_output
            final_json = final_json.copy()
            final_json.update(extracted_data)
        
        print('create util')
        from article.controller import CreateArticleUtil
        CreateArticleUtil.create_article_from_json(final_json, blob)
        return final_json