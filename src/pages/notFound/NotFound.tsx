import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="text-xl font-semibold">404</h1>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#32334A] sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve <br />
          mistyped the URL? Be sure to check your spelling.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-[#32334A] hover:bg-[#3f415a] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            Go back home
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold text-gray-900 border-2	rounded-md py-2.5 px-3.5">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}
