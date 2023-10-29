import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProduct,
  editProduct,
  productsRequest,
  productsSuccess,
  removeProduct
} from '../../redux/slices/products/productSlice'
import api from '../../api'
import AdminSideBar from './AdminSideBar'
import { Product } from '../../types/types'
import useProductState from '../../hooks/useProductState'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


interface IFormInput {
  name: string;
  image: string;
  description: string;
  categories: string;
  variants: string;
  sizes: number;
  price: number;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  image: yup.string().required(),
  description: yup.string().required(),
  categories: yup.string().required(),
  variants: yup.string().required(),
  sizes: yup.number().required(),
  price: yup.number().required(),
});


const initialProductState: Product = {
  id: 0,
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: [],
  price: 0
}

export default function ProductsTable() {
  const dispatch = useDispatch()
  const {products} = useProductState()

  const [product, setProduct] = useState<Product>(initialProductState)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
      categories: "",
      variants: "",
      sizes: 0,
      price: 0,
    },
  });


  useEffect(() => {
    handleGetProducts()
  }, [])

  const handleGetProducts = async () => {
    dispatch(productsRequest())

    const res = await api.get('/mock/e-commerce/products.json')
    dispatch(productsSuccess(res.data))
    console.log(res.data)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isList = name === "categories" || name === "variants" || name === "sizes";
  
    if (selectedProduct) {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct!,
        [name]: isList ? value.split(",") : value,
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: isList ? value.split(",") : value,
      }));
    }
  };
  
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
  
    if (selectedProduct && selectedProduct.id) {
      const updatedProduct = { ...selectedProduct }; // Use selectedProduct instead of product
      dispatch(editProduct({ editedProduct: updatedProduct }));
    } else {
      const newProduct = { ...product, id: new Date().getTime() };
      dispatch(addProduct({ product: newProduct }));
    }
  
    // Reset the form
    setProduct(initialProductState);
    setSelectedProduct(null);
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
        <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
          <div className="flex flex-1 items-center justify-center p-6">
            <form className="mt-5 sm:flex sm:items-center" onSubmit={onSubmitHandler}>
              <div className="flex">
                <div className="mr-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={selectedProduct ? selectedProduct.name : product.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Product Name"
                  />
                </div>
                <div className="mr-2">
                  <input
                    type="text"
                    name="image"
                    id="image"
                    value={selectedProduct ? selectedProduct.image : product.image}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Image Url"
                    
                  />
                </div>
              </div>

              <div className="flex mt-2">
                <div className="mr-2">
                  <input
                    name="description"
                    id="description"
                    value={selectedProduct ? selectedProduct.description : product.description}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Description"
                    type="text"
                  />
                </div>
                <div className="mr-2">
                  <input
                    type="text"
                    name="categories"
                    id="categories"
                    value={
                      selectedProduct
                        ? selectedProduct.categories.join(',')
                        : product.categories.join(',')
                    }
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Categories"
                  />
                </div>
              </div>

              <div className="flex mt-2">
                <div className="mr-2">
                  <input
                    type="text"
                    name="variants"
                    id="variants"
                    value={
                      selectedProduct
                        ? selectedProduct.variants.join(',')
                        : product.variants.join(',')
                    }
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Varients"
                  />
                </div>
                <div className="mr-2">
                  <input
                    type="text"
                    name="sizes"
                    id="sizes"
                    value={
                      selectedProduct ? selectedProduct.sizes.join(',') : product.sizes.join(',')
                    }
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Sizes"
                  />
                </div>
              </div>

              <button
                className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {selectedProduct ? 'Edit Product' : 'Add Product'}
              </button>
            </form>
          </div>

          <table className="w-full table-fixed border">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/7 py-4 px-6 text-left text-gray-600 font-bold">Count</th>
                <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">Image</th>
                <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">Name</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Description</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <img src={item.image} width={100} />
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.name}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.description}</td>

                  <td className="py-4 px-6 border-b border-gray-200 whitespace">
                    <button onClick={() => setSelectedProduct(item)} className="mr-1 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 py-2 px-4 font-small">
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(removeProduct({ productId: item.id }))}
                      className="text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-600 py-2 px-4 font-small">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
