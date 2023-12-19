import api from '../api/index'

export default {
    fetchProductsApi: async(params: string)=>{
        const res = await api.get(`/api/products?${params}`)
        return res
    }
}