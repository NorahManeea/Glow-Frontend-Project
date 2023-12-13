import axios from 'axios'
import { getTokenFromStorage } from '../utils/token'

let baseURL = process.env.BACKEND_ORIGIN

const api = axios.create({
  baseURL
})


const token = getTokenFromStorage()
if(token){
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api
