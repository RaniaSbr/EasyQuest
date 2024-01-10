import unittest
from django.conf import settings
import django
settings.configure()
django.setup()
from Backend.article.extraction.extraction import *
from cermine_xml_sample import SAMPLE_TEXT, EXPECTED_OUTPUT




if __name__ == '__main__':
    pdf_path = \
        "/home/oem/Projects/IGL/EasyQuest/Backend/article/extraction/test/test.pdf"
    blob = "test_blob"

    PdfController.process_and_store_pdf(pdf_path, blob)
