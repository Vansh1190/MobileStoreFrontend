
import Axios from 'axios'
import { useEffect } from 'react'
import { Routes, useNavigate } from 'react-router-dom';


export default function CardComponent({index, imgURL, name, price, _id}) {
  const navigate = useNavigate();
  
  useEffect(() => {
    Axios.get(Routes['GetAllMobiles']).then((items) => {

    })
  }, [])

  const formattedPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };
  

  
  return (
    
          <div onClick={()=>{navigate('/mobile/' + _id)}} id={_id} key={index} className="w-1/2 max-w-72 px-2  lg:px-2">
            <div className="mx-auto mt-2 lg:max-w-64 max-w-64 rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-5 sm:p-6 sm:max-w-2xl lg:flex-auto">
                <img src={(imgURL === 'NA') ? 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-5g-2.jpg' : imgURL} alt="" />
                {/* <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3> */}
                <p className='text-sm'>{name}</p>
                {/* <p className='text-sm font-medium'>₹ 1,20,000</p> */}
                <span className='text-sm mr-2 font-medium'>₹{formattedPrice(price)}</span>
                <span className='text-xs line-through font-medium'>₹{formattedPrice(price-25000)} </span> 
                <span className='text-xs font-medium text-emerald-600'>9% off</span>
              </div>
            </div>
          </div>
  )
}
