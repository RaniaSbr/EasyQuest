import axios from 'axios'

const URL = 'http://127.0.0.1:8000/article/articles'
class ArticleAPI {
  
  static handleDelete = (id, url) => {
    axios
      .delete(`${url}/${id}`)
      .then(response => {
        console.log('Moderator deleted successfully:', response.data.message)
        fetchModerators()
      })
      .catch(error => console.error(error))
  }

  static fetchArticles = (
    url,
    setArticless,
    successCallback,
    errorCallback
  ) => {
    axios
      .get(url)
      .then(response => {
        setArticless(response.data)
        successCallback(response)
      })
      .catch(error => errorCallback(error))
  }
}


export default ModeratorAPI;