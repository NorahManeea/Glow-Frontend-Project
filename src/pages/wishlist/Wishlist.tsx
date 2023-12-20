import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchWishlistThunk } from '../../redux/slices/wishlistSlice'

export default function WishList() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItem);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchWishlistThunk());
  }, []);

  return (
    <div className="container bg-gray-100">
      {wishlistItems.length > 0 ? (
        <div className="flex mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
          <div className="w-full bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Wishlist</h1>
              <h2 className="font-semibold text-2xl">{0 + ' items'}</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Total
              </h3>
            </div>

            {wishlistItems.map((product) => (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b pb-8">
                <div className="flex w-2/5">
                  {/* products */}
                  <div className="w-20">
                    <img className="h-24" src={product.product.image} alt="" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{product.product.name}</span>
                    <span className="text-gray-500 text-xs">{product.product.categories}</span>
                    <button className="font-semibold text-red-500 hover:text-red-700 text-xs text-left">
                      Remove
                    </button>
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
            Sign in to sync your Saved Items across all your devices.


            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                className="rounded-md bg-[#32334A]  px-9 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
