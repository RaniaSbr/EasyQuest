from django.conf import settings
import django
settings.configure()
django.setup()
from Backend.article.extraction.extraction import *
from cermine_xml_sample import SAMPLE_TEXT, EXPECTED_OUTPUT



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


if __name__ == '__main__':
    pdf_path = \
        "/home/oem/Projects/IGL/EasyQuest/Backend/article/extraction/test/test.pdf"
    blob = "test_blob"

    PdfController.process_and_store_pdf(pdf_path, blob)
