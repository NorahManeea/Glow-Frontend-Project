import jwt_decode from 'jwt-decode'
import { isDecodedUser } from '../types/type-guards'

//** Get Decoded Toen From Storage */
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

//** Check if token expired */
export function checkExpiry() {
  const token = getDecodedTokenFromStorage();

  if (!token) {
    return true;
  }

  const isExpired = token.exp * 1000 < new Date().getTime();
  if (isExpired) {
    localStorage.removeItem('token');
    return true
  }else{
    return false
  }
}

//** Get Token From Storage */
export function getTokenFromStorage() {
  const expired = checkExpiry()
  if(!expired){
    const token = localStorage.getItem('token')
    if (!token) return null
  
    return token

  }
  return null
}


