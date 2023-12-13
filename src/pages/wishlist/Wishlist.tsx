import { Link } from 'react-router-dom'

export default function Wishlist() {
  const wishlist = [
    {
      name: '',
      image: '',
      id: 1
    }
  ]
  return (
    <div className="bg-gray-100">
      {wishlist.length > 0 ? (
        <div className="flex mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
          <div className="w-full bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Wishlist</h1>
              <h2 className="font-semibold text-2xl">{0 + ' items'}</h2>
            </div>
            {wishlist.map((product) => (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b pb-8">
                <div className="flex w-full">
                  {/* products */}
                  <div className="w-20">
                    <img className="h-24" src={product.image} alt="" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{product.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#32334A] sm:text-5xl">
              You have no Saved Items
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Start saving as you shop by selecting the little heart.
              <br />
              We'll sync your items across all your devices. Easy.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/products"
                className="rounded-md bg-[#32334A]  px-9 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                Explore Produts
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
