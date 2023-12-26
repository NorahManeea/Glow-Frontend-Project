import api from '../api/index'

export default {
  //** Service:- Login Service */
  loginApi: async (credentials: { email: string; password: string }) => {
    const res = await api.post('/api/auth/login', credentials)
    return res
  },
  //** Service:- Register Service */
  registerApi: async (credentials: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    const res = await api.post('/api/auth/register', credentials)
    return res
  },
  //** Google Login Service */
  loginWithGoogleApi: async (idToken: string) => {
    const res = await api.post(`/api/auth/login/google`, { idToken })
    return res
  },
  //** Service:- Fetch All Users Service */
  fetchAllUsersApi: async () => {
    const res = await api.get('/api/users')
    return res
  },
  //** Service:- Fetch Users count Service */
  fetchUserCountApi: async () => {
    const res = await api.get('/api/users/count')
    return res
  },
  //** Service:- Delete User Service */
  deleteUserApi: async (userId: string) => {
    const res = await api.delete(`/api/users/${userId}`)
    return res
  },
  //** Service:- Delete User Service */
  blockUserApi: async (userId: string) => {
    const res = await api.put(`/api/users/block/${userId}`)
    return res
  },
  //** Service:- Set User Profile Service */
  setUserProfileApi: async (userId: string) => {
    const res = await api.get(`/api/users/profile/${userId}`)
    return res
  },
  //** Service:- Update User Profile Service */
  updateUserProfileApi: async ({
    userId,
    firstName,
    lastName
  }: {
    userId: string
    firstName: string
    lastName: string
  }) => {
    const res = await api.put(`/api/users/profile/${userId}`, { firstName, lastName })
    return res
  },
  //** Service:- Grant Role Service */
  grantRoleApi: async (userId: string) => {
    const res = await api.put(`/api/users/grant-role/${userId}`)
    return res
  }
}
