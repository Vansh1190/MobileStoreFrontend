import React, { useState } from 'react';
import styled from "styled-components"
import Navbar from '../Components/Navbar';
import Axios from 'axios';
import { Routes } from '../constant';
import BuyNowProductDetails from '../Components/BuyNowProductDetails';
import { useNavigate } from 'react-router-dom';

const LandingContainer = styled.div`
padding: 4em;
background: papayawhip;


`

export default function TrackOrder() {
    const [TrackingID, setTrackingID] = useState('')
    const [OrderDetails, setOrderDetails] = useState([])
    const navigate = useNavigate();

    const formattedPrice = (price) => {
        return new Intl.NumberFormat('en-IN').format(price);
    };

    const TrackMyOrder = () => {
        Axios.get(Routes['TrackOrder'], {
            headers: {
                id: TrackingID
            }
        }).then((e) => {
            console.log(e);
            setOrderDetails(e.data.AllOrders)
        }).catch(() => {
            alert('invalid Tracking id')
        })
    }


    return (
        <>
            {/* <LandingContainer> */}
            {/* </LandingContainer> */}

            <div className="m-2.5">
                <label htmlFor="trackingId" className="block text-sm font-semibold leading-6 text-gray-900" >Enter Tracking ID</label>
                <input
                    type="text"
                    onChange={(e) => { setTrackingID(e.target.value) }}
                    value={TrackingID}
                    name="trackingId"
                    id="trackingId"
                    autoComplete="trackingId"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                    type="submit"
                    onClick={TrackMyOrder}
                    className="block w-1/2 mt-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Track Order
                </button>
            </div>

            {(OrderDetails.length >= 0) ?
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                        Order Details
                    </h2>

                    {OrderDetails.map((item, index) => {
                        return (

                                <div onClick={() => { navigate('/mobile/' + item._id) }} id={item._id} key={index} className="w-1/2 px-2  lg:px-2">
                                    <div className="mx-auto mt-2 lg:max-w-64 max-w-64 rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
                                        <div className="p-5 sm:p-6 sm:max-w-2xl lg:flex-auto">
                                            <img src={(item.imgURL == 'NA') ? 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-5g-2.jpg' : item.imgURL} alt="" />
                                            {/* <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3> */}
                                            <p className='text-sm'>{item.name}</p>
                                            {/* <p className='text-sm font-medium'>₹ 1,20,000</p> */}
                                            <span className='text-sm mr-2 font-medium'>₹{formattedPrice(item.price)}</span>
                                        </div>
                                    </div>
                                </div>

                        )
                    })}
                </div>

                : null
            }

            {/* <BuyNowProductDetails/> */}

        </>
    )
}