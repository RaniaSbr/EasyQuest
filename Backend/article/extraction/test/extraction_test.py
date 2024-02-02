<<<<<<< HEAD
from django.conf import settings
import django
import json
settings.configure()
django.setup()
import requests
from bs4 import BeautifulSoup
from lxml import etree
from abc import ABC, abstractmethod


class IExtractData(ABC):
    @abstractmethod
    def extract_data(self, file_path):
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
    def __init__(self, base_url):
        super().__init__(base_url)

    def extract_data(self, file_path, include_raw_citations=True):
        endpoint = "api/processReferences"
        with open(file_path, "rb") as pdf_file:
            files = {'input': (file_path, pdf_file, 'application/pdf')}
            payload = {'includeRawCitations': 'true' if include_raw_citations else 'false'}
            response = self._make_request(endpoint, files, data=payload)

        if response.status_code == 200:
            references = response.text
            root = etree.fromstring(references)
            raw_references = [biblStruct.text for biblStruct in
                              root.findall('.//{http://www.tei-c.org/ns/1.0}note[@type="raw_reference"]')]

            if raw_references:
                return raw_references
            else:
                return None
        else:
            print(f"Grobid request failed with status code {response.status_code}")
            return None


class HeaderExtractor(GrobidClient, IExtractData):
    def __init__(self, base_url):
        super().__init__(base_url)

    def extract_data(self, file_path, consolidate_header=True):
        endpoint = "api/processHeaderDocument"
        with open(file_path, "rb") as pdf_file:
            payload = {'consolidateHeader': "1" if consolidate_header else "0"}
            files = {'input': (file_path, pdf_file, 'application/pdf')}
            response = self._make_request(endpoint, files, params=payload)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'xml')
            print(soup)
            article_title = soup.find('title', type='main').get_text()
            authors = soup.find_all('persName')
            authors_full_names = [f"{author.forename.get_text()} {author.surname.get_text()}" for author in authors]
            abstract = soup.find('abstract').get_text()
            institutions_list = []
            for affiliation in soup.find_all('affiliation'):
                department = affiliation.find('orgName', {'type': 'department'}).text
                institution = affiliation.find('orgName', {'type': 'institution'}).text
                post_code = affiliation.find('postCode').text
                settlement = affiliation.find('settlement').text
                country = affiliation.find('country').text

                college_json = {
                    "college": {
                        "department": department,
                        "institution": institution,
                        "pose_code": post_code,
                        "settlement": settlement,
                        "country": country
                    }
                }
                institutions_list.append(college_json)
            unique_affiliations = list({json.dumps(obj, sort_keys=True) for obj in institutions_list})
            print(unique_affiliations)
            keywords = soup.find_all('keywords')
            keywords_list = [keyword.get_text() for keyword in keywords]

            return {
                'article_title': article_title,
                'authors_full_names': authors_full_names,
                'abstract': abstract,
                'institutions_list': unique_affiliations,
                'keywords_list': keywords_list
            }
        else:
            print(f"Grobid request failed with status code {response.status_code}")
            return None



=======
import unittest
from django.conf import settings
import django

settings.configure()
django.setup()
from Backend.article.extraction.extraction import *
from cermine_xml_sample import SAMPLE_TEXT, EXPECTED_OUTPUT


class TestPdfExtractionUtil(unittest.TestCase):
    def test_pdf_extraction(self):
        sample_pdf_path = "Nothing should be here!"

        pdf_extractor = PdfExtractionUtil(sample_pdf_path)

        pdf_extractor.extract_pdf_to_temp_path = lambda: None
        pdf_extractor.run = lambda: None

        mock_cermine_xml = SAMPLE_TEXT

        with tempfile.NamedTemporaryFile(mode='w+', suffix='.xml', delete=False) as temp_file:
            temp_file.write(mock_cermine_xml)
            temp_xml_path = temp_file.name

        pdf_extractor.parse_cermine_xml(temp_xml_path)

        self.assertEqual(pdf_extractor.json_output, EXPECTED_OUTPUT)


if __name__ == '__main__':
    pdf_path = \
        "/home/oem/Downloads/02fb54718bc9b0e178c21b9aeb1c290e-848830aac4cbe8960f171b34da9b276d0ab0ddf1/test.pdf"
    blob = "test_blob"

    PdfController.process_and_store_pdf(pdf_path, blob)
>>>>>>> MAHRAZABDELRAHMEN
