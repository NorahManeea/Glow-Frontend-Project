import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../api/index';
import {
  productsRequest,
  productsSuccess,
} from '../redux/slices/products/productSlice';
import {categoryActions} from '../redux/slices/categories/categorySlice'
import {orderActions} from '../redux/slices/orders/orderSlice'
import {userActions} from '../redux/slices/users/userSlice'



const useFetchProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(productsRequest());

      try {
        const res = await api.get('/mock/e-commerce/products.json');
        dispatch(productsSuccess(res.data));
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [dispatch]);
};

const useFetchCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(categoryActions.categoryRequest());

      try {
        const res = await api.get('/mock/e-commerce/categories.json');
        dispatch(categoryActions.categorySuccess(res.data));
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [dispatch]);
};

const useFetchUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(userActions.userRequest());

      try {
        const res = await api.get('/mock/e-commerce/users.json');
        dispatch(userActions.userSuccess(res.data));
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [dispatch]);
};

const useFetchOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(orderActions.orderRequest());

      try {
        const res = await api.get('/mock/e-commerce/orders.json');
        dispatch(orderActions.orderSuccess(res.data));
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [dispatch]);
};

export { useFetchProducts, useFetchCategories, useFetchUsers, useFetchOrders };