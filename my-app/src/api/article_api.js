import axios from "axios";
import apiConfig from "./apiConfig";
import TokenAPI from "./token";
const cleanUpData = (originalData) => {
    const cleanedData = {
        title: originalData.meta_data.title,
        keywords: originalData.meta_data.keywords,
        references: originalData.meta_data.references.map((ref) => ref.raw_text),
        abstract: originalData.meta_data.abstract,
        authors: originalData.meta_data.authors.map((author) => author.name),
        institutions: originalData.meta_data.institutions.map(
            (institution) => institution.name
        ),
        date: originalData.meta_data.pub_date,
        url: "go.com",
        id: originalData.id,
    };

    return cleanedData;
};

class ArticleAPI {

    static async handleUpload(url){
        try {
          // Envoyer l'URL au backend Django pour le traitement en utilisant une requête GET
          const response = await axios.get(`${apiConfig.baseUrl}${apiConfig.uploadDrive}`, {
            params: { url },
          });
    
          // Afficher un message de succès ou faire d'autres actions nécessaires
          console.log('Upload réussi!', response.data);
        } catch (error) {
          console.error('Erreur lors de l\'upload', error);
          // Gérer les erreurs et afficher un message à l'utilisateur si nécessaire
        }
      };

    static async fetchArticles() {
        try {
            const response = await fetch(
                `${apiConfig.baseUrl}${apiConfig.articlesEndpoint}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch articles");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    static async fetchArticle(currentPage, cleanIt) {
        try {
            const response = await axios.get(
                `${apiConfig.baseUrl}${apiConfig.articleEndpoint}${currentPage}`
            );
            if (response.status !== 200) {
                throw new Error("Failed to fetch article");
            }

            const data = response.data;
            if ( cleanIt ) return cleanUpData(data);
            return data;
        } catch (error) {
            console.error("Error fetching article:", error);
            throw error;
        }
    }

    
    static async deleteArticle(currentPage) {
        try {
            const response = await axios.delete(
                `${apiConfig.baseUrl}${apiConfig.deleteArticleEndPoint}${currentPage}`
            );
            if (response.status != 301) {
                console.log(response.status);

            }

        } catch (error) {
            console.error("Error deleting article:", error);
            throw error;
        }
    }
    static async validateArticle(currentPage) {
        try {
            const response = await axios.delete(
                `${apiConfig.baseUrl}${apiConfig.validateArticleEndPoint}${currentPage}`
            );
            if (response.status != 200) {
                console.log(response.status);

            }

        } catch (error) {
            console.error("Error validating article:", error);
            throw error;
        }
    }
    static async updateArticle(currentPage, meta_data) {
        console.log("link : " + `${apiConfig.baseUrl}${apiConfig.updateArticleEndPoint}${currentPage}` + '/');
        try {
            const response = await axios.put(
                `${apiConfig.baseUrl}${apiConfig.updateArticleEndPoint}${currentPage}/`,
                { 'meta_data': meta_data }
            );
            if (response.status != 200) {
                console.log(response.status);

            }

        } catch (error) {
            console.error("Error Updating article:", error);
            throw error;
        }
    }
    static async fetchPdfData(pdfId) {
        try {
            const response = await axios.get(
                `${apiConfig.baseUrl}${apiConfig.pdfEndpoint}${pdfId}/`,
                {
                    responseType: "arraybuffer",
                }
            );

            const data = new Blob([response.data]);

            const dataUrl = URL.createObjectURL(data);

            return dataUrl;
        } catch (error) {
            console.error("Error fetching PDF:", error);
            throw error;
        }
    }


    static async fetchAddFavorite(article_Id) {
        const tokenValue1 = getCookie('token');
        
        fetch('http://127.0.0.1:8000/api/add-favorite/' + article_Id +'/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + tokenValue1  // Remplacez par votre jeton d'authentification JWT
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add article to favorites');
            }
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while adding article to favorites');
        });

        function getCookie(name) {
            const cookieName = name + '=';
            const cookieArray = document.cookie.split(';');
            
            for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i].trim();
                if (cookie.indexOf(cookieName) === 0) {
                    return cookie.substring(cookieName.length, cookie.length);
                }
            }
            return null;
        }
    }

    static async fetchRemovFavorite(article_Id) {
        const tokenValue = getCookie('token');
            
            fetch('http://127.0.0.1:8000/api/remove-favorite/' + article_Id + '/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + tokenValue  // Remplacez par votre jeton d'authentification JWT
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to remove article from favorites');
                }
            })
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while removing article from favorites');
            });
            function getCookie(name) {
                const cookieName = name + '=';
                const cookieArray = document.cookie.split(';');
                
                for (let i = 0; i < cookieArray.length; i++) {
                    let cookie = cookieArray[i].trim();
                    if (cookie.indexOf(cookieName) === 0) {
                        return cookie.substring(cookieName.length, cookie.length);
                    }
                }
                return null;
            }
    }
}

export default ArticleAPI;
