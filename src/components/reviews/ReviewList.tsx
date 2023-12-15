// ReviewList.js
import React, { useState } from 'react'

type Review = {
  id: number
  text: string
  author: string
  date: string
}

type ReviewListProps = {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Most Recent Reviews</h2>
    
    </div>
  )
}
