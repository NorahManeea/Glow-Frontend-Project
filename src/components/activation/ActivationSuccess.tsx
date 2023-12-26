import { Link } from 'react-router-dom'

export default function ActivationSuccess() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#32334A] sm:text-5xl">
          Account Activation Successful
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Thank you for activating your account! Your registration is complete, and your account is
          now active.
          <br />
          To get started, log in using the button below. Explore our products, discover exciting
          deals, <br />
          and make the most of your shopping experience on GLOW.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/login"
            className="rounded-md bg-[#32334A] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
