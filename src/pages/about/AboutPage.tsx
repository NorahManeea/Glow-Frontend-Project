import React from 'react'

import CheckboxLineIcon from 'remixicon-react/CheckboxLineIcon'
import CheckDoubleLineIcon from 'remixicon-react/CheckDoubleLineIcon'
import UserSettingsLineIcon from 'remixicon-react/UserSettingsLineIcon'
import Forbid2LineIcon from 'remixicon-react/Forbid2LineIcon'

export default function AboutPage() {
  return (
    <div className="bg-white py-24 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-600">Our Service</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#32334A]">
            Why Choose Our Products
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-16 lg:max-w-4xl">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <div className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2ACAA]/20">
                  <CheckboxLineIcon size={24} color="#F2ACAA" />
                </div>
                Quality Ingredients
              </div>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Our products are made with carefully selected ingredients that are known for their
                skin-nourishing properties. We prioritize quality and ensure that our products are
                free from harmful chemicals.
              </p>
            </div>
            <div className="relative pl-16">
              <div className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2ACAA]/20">
                  <CheckDoubleLineIcon size={24} color="#F2ACAA" />
                </div>
                Effective Results
              </div>
              <p className="mt-2 text-base leading-7 text-gray-600">
                We are committed to delivering products that actually work. Our formulations are
                developed based on scientific research and are designed to address various skin
                concerns, providing visible and long-lasting results.
              </p>
            </div>
            <div className="relative pl-16">
              <div className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2ACAA]/20">
                  <Forbid2LineIcon size={24} color="#F2ACAA" />
                </div>
                Cruelty-Free
              </div>
              <p className="mt-2 text-base leading-7 text-gray-600">
                We are proud to be a cruelty-free brand. None of our products are tested on animals,
                and we ensure that our suppliers follow ethical practices. We believe in providing
                effective skincare without compromising on animal welfare.
              </p>
            </div>
            <div className="relative pl-16">
              <div className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2ACAA]/20">
                  <UserSettingsLineIcon size={24} color="#F2ACAA" />
                </div>
                Personalized Solutions
              </div>
              <p className="mt-2 text-base leading-7 text-gray-600">
                We understand that everyone's skin is unique. That's why we offer personalized
                solutions to cater to individual needs. Whether you have dry skin, acne-prone skin,
                or aging concerns, we have products specifically tailored to address your skincare
                goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
