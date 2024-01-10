import concurrent.futures

from Backend.article.extraction.extraction import PdfExtractionUtil, PdfController


class ConcurrentPdfExtractUtil:
    def __init__(self):
        self.pdf_extractor = PdfController()

    def extract_text_from_pdfs(self, pdf_urls):
        with concurrent.futures.ThreadPoolExecutor() as executor:
            results = list(executor.map(self.extract_text_from_pdf, pdf_urls))
        return results

    def extract_text_from_pdf(self, pdf_url):
        try:
            self.pdf_extractor.process_and_store_pdf(pdf_url)
        except Exception as e:
            print('erro')

