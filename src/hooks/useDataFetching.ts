import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import api from '../api/index'
import { productsRequest, productsSuccess } from '../redux/slices/productSlice'
import { categoryActions } from '../redux/slices/categorySlice'
import { orderActions } from '../redux/slices/orderSlice'
import { userActions } from '../redux/slices/userSlice'


//! NEED FIX
const useFetchProducts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(productsRequest())

      try {
        const res = await api.get('/api/products')
        dispatch(productsSuccess(res.data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [dispatch])
}

const useFetchCategories = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(categoryActions.categoryRequest())

      try {
        const res = await api.get('/api/categories')
        dispatch(categoryActions.categorySuccess(res.data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [dispatch])
}

// const useFetchUsers = () => {
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch(userActions.userRequest())

//       try {
//         const res = await api.get('/api/users')
//         dispatch(userActions.userSuccess(res.data))
//       } catch (error) {
//         console.log(error)
//       }
//     }

//     fetchData()
//   }, [dispatch])
// }

const useFetchOrders = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(orderActions.orderRequest())

      try {
        const res = await api.get('/api/orders')
        dispatch(orderActions.orderSuccess(res.data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [dispatch])
}

export { useFetchProducts, useFetchCategories, useFetchOrders }
