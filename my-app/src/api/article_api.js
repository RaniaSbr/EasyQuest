import axios from "axios";
import apiConfig from "./apiConfig";
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
    static async fetchArticle(currentPage) {
        try {
            const response = await axios.get(
                `${apiConfig.baseUrl}${apiConfig.articleEndpoint}${currentPage}`
            );
            if (response.status !== 200) {
                throw new Error("Failed to fetch article");
            }

            const data = response.data;
            return cleanUpData(data);
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
}

export default ArticleAPI;
