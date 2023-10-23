import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
  const { id } = useParams()
  const state = useSelector((state: RootState) => state)
  const products = state.products
  const product = products.items.find((item) => Number(id) === item.id)
  console.log(product)

  return (
    <div>
      <h1>Name: {product?.name}</h1>
     <img src={product?.image} />
    </div>
  )
}
