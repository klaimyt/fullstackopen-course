import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const modify = async (objectID, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${objectID}`, newObject, config)
  return response.data
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, create, modify, remove }
