import axios from 'axios'


// needs comments + handling errors shall be better.
class ModeratorAPI {
  static handleCreate = (
    url,
    moderatorData,
    successCallback,
    errorCallback
  ) => {
    axios
      .post(url, moderatorData)
      .then(response => {
        successCallback(response)
      })
      .catch(error => {
        errorCallback(error)
      })
  }
  static handleDelete = (id, url) => {
    axios
      .delete(`${url}/${id}`)
      .then(response => {
        console.log('Moderator deleted successfully:', response.data.message)
        fetchModerators()
      })
      .catch(error => console.error(error))
  }
  static fetchModerators = (
    url,
    setModerators,
    successCallback,
    errorCallback
  ) => {
    axios
      .get(url)
      .then(response => {
        setModerators(response.data)
        successCallback(response)
      })
      .catch(error => errorCallback(error))
  }
}


export default ModeratorAPI;