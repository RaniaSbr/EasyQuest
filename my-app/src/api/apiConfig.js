
  
  const apiConfig = {
    baseUrl: 'http://localhost:8000',
    articlesEndpoint: '/article/up_articles/',
    articleEndpoint: '/article/up_article/',
    pdfEndpoint: '/article/up_article/serve-unpublished-article-pdf/',
    deleteArticleEndPoint:'/article/up_article/delete/',
    validateArticleEndPoint:'/article/up_article/validate/',
    updateArticleEndPoint:'/article/up_article/update/',
    uploadDrive: '/myapp/uploadDrive/'
  };
  
  export default apiConfig;
  