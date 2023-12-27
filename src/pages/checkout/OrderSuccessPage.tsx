import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchOrdersCountThunk } from '../../redux/slices/orderSlice'

const AnimatedCounter = (value: number) => {
  const { number } = useSpring({
    reset: true,
    from: { number: 0 },
    number: value
  })

  return <animated.div>{number.interpolate((val) => Math.floor(val))}</animated.div>
}
export default function OrderSuccessPage() {
  const [points, setPoints] = useState(0)
  const [displayPoints, setDisplayPoints] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const earnedPoints = useSelector((state: RootState) => state.orders.earnedPoints)

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 }
  })

  useEffect(() => {
    dispatch(fetchOrdersCountThunk())
  }, [dispatch])

  useEffect(() => {
    setPoints(earnedPoints)
    setDisplayPoints(true)
  }, [])

  return (
    <div className="bg-white px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="mt-4 text-base text-gray-600">
          <h1 className="text-[#956556] my-45 font-bold text-4xl">{points}</h1>
          <animated.div style={fadeIn}>
            <p>You've earned {points} points with this order!</p>
          </animated.div>{' '}
        </div>
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
