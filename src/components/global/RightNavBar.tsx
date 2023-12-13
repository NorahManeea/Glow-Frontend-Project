import { Link } from 'react-router-dom'

export default function RightNavBar() {
  return (
    <div className="flex ">
    <div className="flex flex-shrink-0 items-center">
      <Link to="/">
      <p className='text-[#956556] font-medium'>GLOW</p>
      </Link>
    </div>
  </div>
  )
}
