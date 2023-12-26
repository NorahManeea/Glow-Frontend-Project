import api from '../api/index'

export default {
  //** Service:- Reset PasswordService */
  resetPasswordApi: async (email: string) => {
    const res = await api.post('/api/reset-password', { email })
    return res
  },

  //** Service:- Add to Cart Api */
  resetPasswordUrlApi: async ( { userId, token, password }: { userId: string; token: string; password: string }) => {
    const res = await api.post(`/api/reset-password/${userId}/${token}`, { password })
    return res
  }
}
