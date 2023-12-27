import { Link } from 'react-router-dom'
import './home.css'
//** Components */
import HighestSoldProducts from '../../components/products/HighestSoldProducts'
//** Icons */
import CheckboxCircleLineIcon from 'remixicon-react/CheckboxCircleLineIcon'
import HandHeartLineIcon from 'remixicon-react/HandHeartLineIcon'
import VipDiamondLineIcon from 'remixicon-react/CopperDiamondLineIcon'
import image from '../../assets/hero1.svg'
//** Localization */
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-[#32334A]">
              {t('title')}
              <span className="text-[#956556] typewriter-animation"> GLOW</span>
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              {t('subTitle')}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-white font-medium text-center rounded-lg bg-[#956556] hover:bg-[#826156]  focus:ring-4 focus:ring-primary-300">
              {t('exploreProducts')}
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={image} alt="home" />
          </div>
        </div>
      </div>

      <div className="bg-[#F7F7F7] py-12">
        <div className="grid md:grid-cols-3 max-w-screen-lg mx-auto gap-10 px-5">
          <div className="flex gap-4 items-start flex-col ">
            <span className="text-[#F2ACAA] bg-[#F2ACAA]/20 p-3 rounded-full">
              <CheckboxCircleLineIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-semibold text-xl text-[#32334A]">Glowing Skin</h3>
              <p className="mt-1 text-gray-500">
                Achieve radiant and glowing skin with our GLOW skincare product. Our formula is
                designed to give you a healthy, luminous complexion.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start flex-col ">
            <span className="text-[#F2ACAA] bg-[#F2ACAA]/20 p-3 rounded-full">
              <HandHeartLineIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-semibold text-xl text-[#32334A]">Nourishing and Effective</h3>
              <p className="mt-1 text-gray-500">
                Our GLOW skincare product is highly nourishing and effective. It's packed with
                skin-loving ingredients.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start flex-col ">
            <span className="text-[#F2ACAA] bg-[#F2ACAA]/20 p-3 rounded-full">
              <VipDiamondLineIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-semibold text-xl text-[#32334A]">Simple and Natural</h3>
              <p className="mt-1 text-gray-500">
                Our GLOW skincare product is made with simple and natural ingredients. We believe in
                providing you with a clean and gentle skincare solution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Seller Products*/}
      <HighestSoldProducts />

      <div className="bg-white">
        <div className="gap-16 items-center py-2 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-[#32334A]">
              Unleash Your Radiant Glow <br /> with Pure Elegance
            </h2>
            <p className="mb-4">
              Step into a world of pure elegance and unlock the radiance within you. Our
              meticulously crafted skincare collection is designed to bring out your natural glow
              like never before. With a fusion of expertise and premium ingredients, experience the
              transformative power of our luxurious formulations. Discover the true essence of
              beauty and let your radiant glow captivate the world.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://i.pinimg.com/564x/61/3b/8e/613b8e0a364a7b11aea705cdc1c52cdf.jpg"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://i.pinimg.com/564x/28/d2/08/28d20840d564c7cff6beecfd6f9d9790.jpg"
              alt="office content 2"
            />
          </div>
        </div>
      </div>

      <div className="bg-white">
      <div className="mt-8 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F7F7F7] py-10 px-6 sm:py-16 sm:px-12 lg:flex lg:items-center lg:p-20">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-[#32334A]">Stay Informed with Our Newsletter</h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-500 ">
            Explore exclusive updates, beauty insights, and expert tips. Join our radiant skincare community. Subscribe now for a glowing experience!            </p>
          </div>
          <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
            <form method="post" className="sm:flex space-y-2">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" type="email" autoComplete="email" className="w-full rounded-md border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700" placeholder="Your email" />
              <input type="checkbox" defaultValue={1} className="hidden" tabIndex={-1} autoComplete="off" />
              <button type="submit" className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-[#956556] hover:bg-[#826156] px-5 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
  
      </div>


     

      <div className="flex">
        <div className="relative">
          <img
            src="https://i.pinimg.com/564x/1d/4e/55/1d4e55a767a0010fed9c55433a53be89.jpg"
            className="block w-[253px] h-[208px] object-cover"
            style={{ aspectRatio: '253 / 208' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      

        <img
          src="https://i.pinimg.com/564x/73/98/d6/7398d65826d2bba56ddd34de910e1f39.jpg"
          className="block w-[253px] h-[208px]"
          width={253}
          height={208}
          style={{ aspectRatio: '253 / 208', objectFit: 'cover' }}
        />
        <img
          src="https://i.pinimg.com/564x/cf/33/c7/cf33c77fa091dcc50c104034929653b3.jpg"
          className="block w-[253px] h-[208px]"
          width={253}
          height={208}
          style={{ aspectRatio: '253 / 208', objectFit: 'cover' }}
        />
        <img
          src="https://i.pinimg.com/736x/93/8c/92/938c92d4d32054256d364f43d9c0c4a3.jpg"
          className="block w-[253px] h-[208px]"
          width={253}
          height={208}
          style={{ aspectRatio: '253 / 208', objectFit: 'cover' }}
        />
        <img
          src="https://i.pinimg.com/564x/a1/1d/3a/a11d3a621cb05346b6031fb8853807f3.jpg"
          className="block w-[253px] h-[208px]"
          width={253}
          height={208}
          style={{ aspectRatio: '253 / 208', objectFit: 'cover' }}
        />

        <img
          src="https://i.pinimg.com/564x/b2/5c/92/b25c925cf02b45bc4cd764047e2fa5eb.jpg"
          className="block w-[253px] h-[208px]"
          width={253}
          height={208}
          style={{ aspectRatio: '253 / 208', objectFit: 'cover' }}
        />
        <img
          src="https://i.pinimg.com/564x/ee/77/29/ee77296cafaf6d52842fe80a91832a19.jpg"
          className="block w-[253px] h-[208px]"
          width={253}
          height={208}
          style={{ aspectRatio: '253 / 208', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
