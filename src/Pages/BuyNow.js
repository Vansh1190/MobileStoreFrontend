/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
import BuyNowProductDetails from '../Components/BuyNowProductDetails'
import BuyNowForm from '../Components/BuyNowDetailsForm'
import { Link, useNavigate, useParams } from 'react-router-dom'


export default function BuyNow() {

    const params = useParams()
    // console.log(params)

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <BuyNowProductDetails />
            {(!window.location.href.includes('orderPlaced')) ?
                <BuyNowForm />
                :
                    <section className="relative isolate text-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                        <div className="max-w-full lg:max-w-full w-full">
                            {/* <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" /> */}
                                <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                                    <p>
                                       Order Placed Successfully
                                    </p>
                                    <p className='mt-4  text-sm' >Here's your tracking id</p>
                                    <p onClick={()=> {navigator.clipboard.writeText(params.id); alert('copied successfully')}} className='mt-2 p-1 bg-violet-200 text-center text-slate-700 text-sm' >{params.id}</p>
                                </blockquote>
                                
                                <figcaption className="mt-10">
                                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                        <div className="text-gray-600">Thank you for placing order with us</div>
                                    </div>
                                    <Link className='text-blue-500 font-semiBold'  to={'/trackOrder'}
                                    >Track Order</Link>
                                </figcaption>
                        </div>
                    </section>
            }
        </div>
    )
}
