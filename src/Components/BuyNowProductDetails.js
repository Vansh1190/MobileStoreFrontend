import Axios  from 'axios';
import { useEffect, useState } from 'react';
import { Routes } from '../constant';
import { useParams } from 'react-router-dom';

export default function BuyNowProductDetails() {
    const { id } = useParams();
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
            setMobileSpecifications(details.data?.mobileDetails)
        })
    },[])



    return (
        <div className="overflow-hidden -mt-24 border-2 p-4 rounded-x">
            <div className="max-w-100 px-2 lg:px-8">
                <div className="justify-items-center items-center grid w-4xl grid-cols-2 gap-4 lg:mx-0 lg:max-w-full lg:grid-cols-2">
                    <div className="w-50">
                        <div className="lg:max-w-lg">
                            <p className='text-sm lg:text-2xl  font-semibold'>{MobileSpecifications.name}</p>
                            {/* <p className='text-sm font-medium'>₹ 1,20,000</p> */}
                            <span className='text-md mr-2 lg:text-xl font-medium'>₹{formattedPrice(MobileSpecifications.price)}</span>
                            <span className='text-s line-through lg:text-xl font-thin'>₹{formattedPrice(MobileSpecifications.price - 25000)} </span>
                            <span className='text-xs font-medium ml-2 text-emerald-600'> 9% off</span>
                        </div>
                    </div>
                    <img
                        src={(MobileSpecifications.imgURL == 'NA') ? 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-5g-2.jpg' : MobileSpecifications.imgURL} 
                        alt="Product screenshot"
                        className="w-[30vw] max-w-52 rounded-md sm:w-[40vw] "
                    />
                </div>
            </div>
        </div>
    )
}
