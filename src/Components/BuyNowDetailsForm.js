import {  useState } from "react"

import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../constant";
import { AllCountries, CountryStates, StateCities } from "../CustomFunctions/Address";
import { isEmpty } from "lodash";


export default function BuyNowForm() {

    const navigate = useNavigate();
    const { id } = useParams();


    const [Name, setName] = useState('')
    const [Phone, setPhone] = useState('')
    const [Error, setError] = useState({})
    const [Email, setEmail] = useState('')
    const [City, setCity] = useState('')
    const [Address, setAddress] = useState('')
    const [ZipCode, setZipCode] = useState()
    const [State, setState] = useState({})
    const [Country, setCountry] = useState({})
    const [BuyItem, setbuyItem] = useState(id)


    // Validation function for email
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Validation function for phone number
    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    };

    // Validation function for zip code
    const validateZipCode = (zipCode) => {
        const regex = /^[0-9]{6}$/;
        return regex.test(zipCode);
    };

    const ValidateFields = () => {
        // Validate Email
        if (!validateEmail(Email)) {
            setError((prevError) => ({ ...prevError, email: 'Enter a valid email address' }));
            return false
        }
        else {
            setError((prevError) => ({ ...prevError, email: false }));
            delete (Error['email'])
        }
        // Validate Phone
        if (!validatePhone(Phone)) {
            setError((prevError) => ({ ...prevError, phone: 'Enter a valid 10-digit phone number' }));
            return false
        }
        else {
            console.log(validatePhone(Phone))
            setError((prevError) => ({ ...prevError, phone: false }));
            delete (Error['phone'])
        }

        // Validate State
        if (!State.trim()) {
            setError((prevError) => ({ ...prevError, state: 'State is required' }));
            return false
        }
        else {
            setError((prevError) => ({ ...prevError, state: false }));
            delete (Error['state'])
        }

        // Validate City
        if (!City.trim()) {
            setError((prevError) => ({ ...prevError, city: 'City is required' }));
            return false
        }
        else {
            setError((prevError) => ({ ...prevError, city: false }));
            delete (Error['city'])
        }

        // Validate Zip Code
        if (!validateZipCode(ZipCode)) {
            setError((prevError) => ({ ...prevError, zipCode: 'Enter a valid 6-digit zip code' }));
            return false
        }
        else {
            setError((prevError) => ({ ...prevError, zipCode: false }));
            delete (Error['zipCode'])
        }

        // Validate Address
        if (!Address.trim()) {
            setError((prevError) => ({ ...prevError, address: 'Address is required' }));
            return false
        }
        else {
            setError((prevError) => ({ ...prevError, address: false }));
            delete (Error['address'])
        }

        return true

    }

    // useEffect to update errors on input change



    const handleSubmit = async (e) => {
        console.log(ValidateFields())
        console.log(Error)
        // const CheckErrors = Object.values(Error).every(value => value === false);
        // console.log(CheckErrors)

        e.preventDefault();
        if (ValidateFields()) {
            try {
                const response = await Axios.post(Routes['PlaceOrder'], {
                    name: Name,
                    email: Email,
                    phone: Phone,
                    state: State,
                    city: City,
                    zipCode: ZipCode,
                    address: Address,
                    country: Country,
                    buyItem: BuyItem,
                });

                console.log('Form submitted successfully:', response.data);
                navigate('/orderPlaced/' + response.data.TrackingID);
            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        } else {
            // Form has validation errors
            console.log('Form has validation errors. Please check the form fields.');
        }
    };

    return (
        <>
            <div className="mx-auto max-w-2xl text-start">
                {/* <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Details</h2> */}
                <p className="mt-6 text-lg font-bold leading-16 text-gray-800">
                    Fill your shipping address
                </p>
            </div>
            <form onSubmit={handleSubmit} action="#" method="POST" className="mx-auto mt-2 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => { setName(e.target.value) }}
                                type="text"
                                name="first-name"
                                required={true}
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Email
                            {Error.email && (
                                <span className="text-red-500 text-sm mt-2">{Error.email}</span>
                            )}
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="email"
                                onChange={(e) => { setEmail(e.target.value) }}
                                name="email"
                                id="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                            Phone number    {Error.phone && (
                                <span className="text-red-500 text-sm mt-2">{Error.phone}</span>
                            )}
                        </label>
                        <div className="relative mt-2.5">
                            <input
                                type="tel"
                                onChange={(e) => { setPhone(e.target.value) }}
                                name="phone-number"
                                id="phone-number"
                                autoComplete="tel"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div  className="sm:col-span-2">
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                Country
                                {Error.state && (
                                    <span className="text-red-500 text-sm mt-2">{Error.country}</span>
                                )}
                            </label>
                            <div className="mt-2.5">
                                <select
                                    onChange={(e) => { setCountry(e.target.value); console.log(e.target) }}
                                    value={Country}
                                    name="state"
                                    required={true}
                                    id="state"
                                    autoComplete="state"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >


                                    <option value="">Select Country</option>
                                    {AllCountries().map((country) => {
                                        // console.log(country)
                                        return (
                                            <option key={country.countryCode} value={JSON.stringify(country)}>{country.countryName}</option>
                                        )
                                    })}
                                    {/* Add more options as needed */}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div  className="sm:col-span-2">
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            State
                            {Error.state && (
                                <span className="text-red-500 text-sm mt-2">{Error.state}</span>
                            )}
                        </label>
                        <div className="mt-2.5">
                            <select
                                onChange={(e) => { setState(e.target.value) }}
                                value={State}
                                name="state"
                                id="state"
                                required={true}
                                autoComplete="state"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">Select State</option>

                                {(!isEmpty(Country)) ? CountryStates(Country).map((state) => {
                                    return (
                                        <option key={state.stateCode} value={JSON.stringify(state)}>{state.stateName}</option>
                                    )
                                })
                                : null
                            }

                                {/* <option value="state2">State 2</option> */}
                                {/* Add more options as needed */}
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            City {Error.city && (
                                <span className="text-red-500 text-sm mt-2">{Error.city}</span>
                            )}
                        </label>
                        <select
                                onChange={(e) => { setCity(e.target.value) }}
                                required={true}
                                value={City}
                                name="city"
                                id="city"
                                autoComplete="city"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">Select City</option>
                                
                                {(!isEmpty(State)) ? StateCities( Country, State).map((city) => {
                                    return (
                                        <option key={city.cityCode} value={city.cityName.toLowerCase()}>{city.cityName}</option>
                                    )
                                })
                                : null
                            }

                                {/* <option value="state2">State 2</option> */}
                                {/* Add more options as needed */}
                            </select>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            Zip Code/ Pin code
                            {Error.zipCode && (
                                <span className="text-red-500 text-sm mt-2">{Error.zipCode}</span>
                            )}
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="number"
                                onChange={(e) => { setZipCode(e.target.value) }}
                                name="company"
                                id="company"
                                autoComplete="organization"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="state" className="block text-sm font-semibold leading-6 text-gray-900">
                            Country
                            {Error.state && (
                                <span className="text-red-500 text-sm mt-2">{Error.state}</span>
                            )}
                        </label>
                        <div className="mt-2.5">

                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            Address {Error.address && (
                                <span className="text-red-500 text-sm mt-2">{Error.address}</span>
                            )}
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                onChange={(e) => { setAddress(e.target.value) }}
                                name="message"
                                id="message"
                                autoComplete="address"
                                rows={4}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Buy Now
                    </button>
                </div>
            </form>
        </>
    )
}
