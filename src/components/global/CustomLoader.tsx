import { Oval } from 'react-loader-spinner'

export default function CustomLoader() {
  return (
    //** Custom Loader */
    <div className="relative inline-block">
      <Oval
        height={40}
        width={40}
        color="#000000"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#0e0e0e"
        strokeWidth={2}
        strokeWidthSecondary={3}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 font-bold">
        G
      </div>
    </div>
  )
}
