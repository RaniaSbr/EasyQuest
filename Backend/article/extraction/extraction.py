<<<<<<< HEAD

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
            soup = BeautifulSoup(response.text, 'xml')
            article_title = return_valid_text_from_data(soup.find('title', type='main'))
            authors = soup.find_all('persName')
            authors_full_names = [(f"{return_valid_text_from_data(author.forename)}"
                                   f" {return_valid_text_from_data(author.surname)}") for author in authors]
            abstract = return_valid_text_from_data(soup.find('abstract'))
            institutions_list = []
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
            unique_affiliations = list({json.dumps(obj, sort_keys=True) for obj in institutions_list})
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
=======
import os
import xml.etree.ElementTree as ET
import tempfile
import requests
from Backend.article.contrller import CreateArticleUtil
from grobid_client.grobid_client import GrobidClient


class PdfExtractionUtil:
    """
    PdfExtractionUtil class for extracting content from PDFs.

    Attributes:
        pdf_path (str): The path to the PDF file.
        temp_dir (str): The Temporary Folder Containing the file.
        json_output (json): The json output of the xml file got from cermine
    """

    def __init__(self, pdf_path):
        """
        Initializes PdfExtractionUtil with the given PDF path.

        Args:
            pdf_path (str): The path to the PDF file.
        """
        self.pdf_path = pdf_path
        self.temp_dir = tempfile.mkdtemp()
        self.json_output = {}

    def extract_pdf_to_temp_path(self):
        """
        Extracts content from the PDF using Cermine and stores it in a temporary XML file.
        """
        url = "http://cermine.ceon.pl/extract.do"
        headers = {"Content-Type": "application/binary"}
        with open(self.pdf_path, "rb") as pdf_file:  # Open PDF in binary mode
            response = requests.post(url, headers=headers, data=pdf_file)
        if response.status_code == 200:
            print(response.text)
            extracted_metadata = response.text
            temp_cermine_xml_path = os.path.join(self.temp_dir, "cermine_output.xml")
            with open(temp_cermine_xml_path, "w", encoding="utf-8") as xml_file:
                xml_file.write(extracted_metadata)

            print("XML file created successfully at:", temp_cermine_xml_path)

        else:
            print("Error:", response.status_code, response.text)

    def parse_cermine_xml(self, xml_path):
        """
        Parses the Cermine XML file and extracts specific information.

        Args:
            xml_path (str): Path to the Cermine XML file.
        """
        tree = ET.parse(xml_path)
        root = tree.getroot()

        article_meta = root.find('.//front/article-meta')

        self.json_output['doi'] = article_meta.find('.//article-id[@pub-id-type="doi"]').text if article_meta.find(
            './/article-id[@pub-id-type="doi"]') is not None else "None"
        self.json_output['title'] = article_meta.find('.//title-group/article-title').text if article_meta.find(
            './/title-group/article-title') is not None else "None"
        self.json_output['abstract'] = article_meta.find('.//abstract/p').text if article_meta.find(
            './/abstract/p') is not None else "None"
        self.json_output['authors'] = [
            {
                'name': author.find('string-name').text if author.find('string-name') is not None else "None",
                'affiliations': [xref.text for xref in author.findall('xref[@ref-type="aff"]')] if author.findall(
                    'xref[@ref-type="aff"]') is not None else "None"
            }
            for author in article_meta.findall('.//contrib-group/contrib[@contrib-type="author"]')
        ]
        self.json_output['institutions'] = [
            {
                'label': affiliation.find('label').text if affiliation.find('label') is not None else "None",
                'name': affiliation.find('institution').text if affiliation.find('institution') is not None else "None",
                'address': affiliation.find('addr-line').text if affiliation.find('addr-line') is not None else "None",
                'country': affiliation.find('country').get('country') if affiliation.find(
                    'country') is not None else "None"
            }
            for affiliation in article_meta.findall('.//aff')
        ]
        self.json_output['pub_date'] = article_meta.find('.//pub-date/year').text if article_meta.find(
            './/pub-date/year') is not None else "None"
        self.json_output['references'] = [
            {
                'authors': [
                    {
                        'surname': name.find('surname').text if name.find('surname') is not None else "None",
                        'given_names': name.find('given-names').text if name.find('given-names') is not None else "None"
                    }
                    for name in ref.findall('.//string-name')
                ] if ref.findall('.//string-name') is not None else "None",
                'year': ref.find('.//year').text if ref.find('.//year') is not None else "None",
                'article_title': ref.find('.//article-title').text if ref.find(
                    './/article-title') is not None else "None",
                'source': ref.find('.//source').text if ref.find('.//source') is not None else "None",
                'volume': ref.find('.//volume').text if ref.find('.//volume') is not None else "None",
                'pages': ref.find('.//pages').text if ref.find('.//pages') is not None else "None"
            }
            for ref in root.findall('.//ref')
        ]

    def run(self):
        """
        Runs the PDF extraction process.

        This method calls the extract_pdf_to_temp_path, parse_cermine_xml, and
        return_json_from_extraction_xml methods in sequence.
        """
        self.extract_pdf_to_temp_path()
        temp_cermine_xml = os.path.join(self.temp_dir, "cermine_output.xml")
        self.parse_cermine_xml(temp_cermine_xml)
        print(self.json_output)
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)


class PdfController:
    @staticmethod
    def process_and_store_pdf(pdf_path, blob):
<<<<<<< HEAD
        server = "http://localhost:8070"
        extraction_classes = [HeaderExtractor, ReferencesExtractor]
        final_json = {}
        for data in extraction_classes:
            pdf_util = PdfExtractionUtil(pdf_path, document_extractor=data)
            pdf_util.run(server)
            extracted_data = pdf_util.json_output
            final_json = final_json.copy()
            final_json.update(extracted_data)
        from article.controller import CreateArticleUtil
        CreateArticleUtil.create_article_from_json(final_json, blob)
        return final_json
=======

        pdf_util = PdfExtractionUtil(pdf_path)
        print("hello")
        pdf_util.run()

        extracted_data = pdf_util.json_output
        print("mannnnnnnnnnnnnnnnnnnn")
        print(extracted_data)
        CreateArticleUtil.create_article_from_json(extracted_data, blob)
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
