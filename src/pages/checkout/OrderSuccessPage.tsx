import { Link } from "react-router-dom";

export default function OrderSuccessPage() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#32334A] sm:text-5xl">
      Thank you for your order!
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
      Your order has been successfully placed.
        <br />
        <p>We appreciate your business and hope you enjoy your purchase!</p>
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/products"
          className="rounded-md bg-[#32334A] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          Continue Shopping
        </Link>
      </div>
    </div>
  </div>
  )
}
