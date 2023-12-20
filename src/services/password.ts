import api from '../api/index'

export default {
  //** Reset PasswordService */
  resetPasswordApi: async (email: string) => {
    const res = await api.post('/api/reset-password', { email })
    return res
  },

  //** Add to Cart Api */
  resetPasswordUrlApi: async ( { userId, token, password }: { userId: string; token: string; password: string }) => {
    const res = await api.post(`/api/reset-password/${userId}/${token}`, { password })
    return res
  }
}
