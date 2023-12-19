import jwt_decode from 'jwt-decode'
import { isDecodedUser } from '../types/type-guards'

export function getDecodedTokenFromStorage() {
  const token = localStorage.getItem('token')

  if (!token) return null
  try {
    const decodedUser = jwt_decode(token)
    if (!isDecodedUser(decodedUser)) return null

    return decodedUser
  } catch (error) {
    return null
  }
}

export function getTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  return token
}
