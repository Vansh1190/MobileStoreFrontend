import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Routes } from '../constant';


export default function MobileDetails({  name, }) {
    const { id } = useParams();
    console.log(id)
    const [MobileSpecifications, setMobileSpecifications] = useState({} | null)

    const formattedPrice = (price) => {
        return new Intl.NumberFormat('en-IN').format(price);
    };


    useEffect(() => {
        Axios.get(Routes['MobileDetails'], {
            headers: {
                mobileid: id
            }
        }).then((details) => {
            console.log(details);
            setMobileSpecifications(details.data?.mobileDetails)
        })
    },[])

    return (
        <div className="bg-white py-0 sm:py-0">
            <div className="mx-auto max-w-full px-6 lg:px-8">
                {/* <div className="mx-auto mt-2 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"> */}
                <div className="p-6 px-1 sm:p-6  lg:flex-auto">
                    <img  className='w-[52vw] sm:w-80 max-w-80  m-auto center' src={(MobileSpecifications.imgURL === 'NA') ? 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-5g-2.jpg' : MobileSpecifications.imgURL}  alt="MobileIMG" />
                    <div className="h-px mt-4 flex-full w-full bg-gray-100" />
                    <h3 className="text-xl font-bold tracking-tight text-gray-900">{MobileSpecifications.name}</h3>
                    <p className='text-sm'>{name}</p>
                    {/* <p className='text-sm font-medium'>₹ 1,20,000</p> */}
                    <span className='text-md mr-2 font-medium'>₹{formattedPrice(MobileSpecifications.price)}</span>
                    <span className='text-s line-through font-medium'>₹{formattedPrice(MobileSpecifications.price - 25000)} </span>
                    <span className='text-xs font-medium text-emerald-600'> 9% off</span>
                    <div className="mt-10 flex items-center gap-x-4">
                        <h3 className="flex-none text-md font-semibold leading-6 text-indigo-600">Specifications</h3>
                        <div className="h-px flex-auto bg-gray-100" />
                    </div>
                    <ul role="list" className="mt-8 grid grid-cols-2 gap-4 text-sm leading-6 text-gray- sm:grid-cols-2 sm:gap-6">
                        <h4 className='font-bold'>Type</h4>
                        <span>{MobileSpecifications.type}</span>

                        <h4 className='font-bold'>OS</h4>
                        <span>{MobileSpecifications.OS}</span>
                        
                        <h4 className='font-bold'>Memory</h4>
                        <span>{MobileSpecifications.memory}</span>
                        
                        <h4 className='font-bold'>Processor</h4>
                        <span>{MobileSpecifications.processor}</span>
                        
                        
                        <h4 className='font-bold'>Weight</h4>
                        <span>{'115 gm'}</span>
                        
                        <h4 className='font-bold mb-20'>Storage</h4>
                        <span>{MobileSpecifications.storage}</span>

                    </ul>
                </div>
                <div className="fixed bottom-0 left-0">
                    <div className="rounded-2xl w-screen bg-gray-50 p-2 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center ">
                            <Link
                                to={"/buy/" + id}
                                className="block w-full rounded-md bg-indigo-600 px-3 py-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Buy Now
                            </Link>
                        </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}
