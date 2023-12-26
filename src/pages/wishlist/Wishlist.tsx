import { useEffect } from 'react'
import { Link } from 'react-router-dom'
//** Redux */
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchWishlistItemsThunk } from '../../redux/slices/wishlistSlice'
//** Components */
import CustomLoader from '../../components/global/CustomLoader'
import EmptyState from '../../components/common/EmptyState'

const WishlistPage = () => {
  const { wishlistItems, isLoading } = useSelector((state: RootState) => state.wishlist)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchWishlistItemsThunk())
  }, [])

  if (isLoading) {
    return (
      <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto my-56">
        <div className="container px-5 py-20 mx-auto">
          <div className="text-center">
            <CustomLoader />
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className=" mx-auto bg-gray-100 text-center w-full">
      {wishlistItems.length > 0 ? (
        <div className="flex mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
          <div className="w-full bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Wishlist</h1>
              <h2 className="font-semibold text-2xl">{wishlistItems.length + ' items'}</h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {wishlistItems.map((product) => (
                <div key={product._id} className="group relative bg-gray-100 rounded-xl p-3">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.product.image}
                      alt={product.product.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <div>
                      <Link to={`/products/${product._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product.name}
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">{product.product.price}</p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center gap-1">
                        <div
                          className={`relative border-2 border-transparent p-1 rounded-full bg-white`}>
                          <svg
                            className={`h-6 w-6 cursor-pointer ${'text-gray-500'}`}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        //** if wishlist empty */
        <EmptyState
          title="Your wishlist is empty"
          subTitle="Looks like you haven't added anything to your wishlist. Go ahead and explore products."
          link="/products"
          linkText="Explore products"
        />
      )}
    </div>
  )
}

export default WishlistPage
