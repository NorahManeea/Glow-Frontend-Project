import axios from 'axios'
import { getTokenFromStorage } from '../utils/token'

let BASE_URL = import .meta.env.VITE_BACKEND_ORIGIN || 'http://localhost:5050'

const api = axios.create({
  baseURL: BASE_URL
})

const token = getTokenFromStorage()
if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}



export default api
