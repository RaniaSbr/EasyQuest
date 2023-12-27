import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ModeratorList = () => {
  const [moderators, setModerators] = useState([]);
  const [data, setData] = useState([]);
  const [newModerator, setNewModerator] = useState({
    first_name: '',
    last_name: '',
    password: '',
    email: ''
  })

  useEffect(() => {
    fetchModerators()
  }, [])

  const fetchModerators = () => {
    axios
      .get('http://localhost:8000/moderator/mods/')
      .then(response => setModerators(response.data))
      .catch(error => console.error(error))
  }

  const handleDelete = id => {
    axios
      .delete(`http://localhost:8000/moderator/${id}/`)
      .then(response => {
        console.log('Moderator deleted successfully:', response.data.message)
        fetchModerators()
      })
      .catch(error => console.error(error))
  }

  const handleCreate = () => {
    setData(newModerator.password);
    axios
      .post('http://localhost:8000/moderator/create/', newModerator)
      .then(response => {
        setData(response.status)
        setNewModerator({
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        })
        fetchModerators()
      })
      .catch(error => setData(error))
  }

  const handleChange = e => {
    const { name, value } = e.target
    setNewModerator(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div>
      <h2 className='text-2xl'>Moderator List</h2>
      <ul>
        {moderators.map(moderator => (
          <li key={moderator.id}>
            {moderator.first_name} {moderator.last_name} {moderator.email}{' '}
            {moderator.mod_id}
            <button onClick={() => handleDelete(moderator.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Create Moderator</h2>
      <form>
        <label>
          First Name:
          <input
            type='text'
            name='first_name'
            value={newModerator.first_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type='text'
            name='last_name'
            value={newModerator.last_name}
            onChange={handleChange}
          />
        </label>
       
        <label>
          Email:
          <input
            type='email'
            name='email'
            value={newModerator.email}
            onChange={handleChange}
          />
        </label>

        <button type='button' onClick={handleCreate}>
          Create Moderator
        </button>
      </form>
      <h2 className='text-xl text-green' >THIS IS THE {data.toString()}</h2>
    </div>
  )
}

export default ModeratorList
