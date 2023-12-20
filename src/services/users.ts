import api from '../api/index'

export default {
  //** Login Service */
  loginApi: async (credentials: { email: string; password: string }) => {
    const res = await api.post('/api/auth/login', credentials)
    return res
  },
  //** Register Api */
  registerApi: async (credentials: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    const res = await api.post('/api/auth/register', credentials)
    return res
  },
  //** Fetch All Users Service */
  fetchAllUsersApi: async () => {
    const res = await api.get('/api/users')
    return res
  },
  //** Fetch Users count Service */
  fetchUserCountApi: async () => {
    const res = await api.get('/api/users/count')
    return res
  },
  //** Delete User Service */
  deleteUserApi: async (userId: string) => {
    const res = await api.delete(`/api/users/${userId}`)
    return res
  },
  //** Delete User Service */
  blockUserApi: async (userId: string) => {
    const res = await api.put(`/api/users/block/${userId}`)
    return res
  },
  //** Set User Profile Service */
  setUserProfileApi: async (userId: string) => {
    const res = await api.get(`/api/users/profile/${userId}`)
    return res
  },
  //** Update User Profile Service */
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
  }
}
