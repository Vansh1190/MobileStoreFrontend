import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import Navbar from '../Components/Navbar';
import CardComponent from '../Components/CardComponent';
import Axios from 'axios';
import { Routes } from '../constant';

const LandingContainer = styled.div`
padding: 4em;
background: papayawhip;
`

// ... (previous imports)

export default function HomePage() {
    const [allMobilesData, setAllMobilesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isHidden, setisHidden] = useState(true);
    const [filters, setFilters] = useState({
        storage: '',
        memory: '',
        price: '',
        type: '',
    });

    useEffect(() => {
        Axios.get(Routes['GetAllMobiles']).then((items) => {
            setAllMobilesData(items.data.AllMobiles);
            setFilteredData(items.data.AllMobiles);
        });
    }, []);

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    const applyFilters = () => {
        let filteredResult = allMobilesData;
        console.log(filters)

        if (filters.storage) {
            filteredResult = filteredResult.filter((item) => item.storage == filters.storage);
            console.log(filteredResult)
        }

        if (filters.memory) {
            filteredResult = filteredResult.filter((item) => item.memory == filters.memory);
        }

        if (filters.price) {
            filteredResult = filteredResult.filter((item) => item.price <= parseInt(filters.price));
        }

        if (filters.type) {
            filteredResult = filteredResult.filter((item) => item.type.toLowerCase() === filters.type.toLowerCase());
        }

        console.log(filteredResult)
        setFilteredData(filteredResult);
    };

    return (
        <>
            <button
                className="m-4 bg-blue-500 px-4 py-2  text-white p-2 rounded"
                onClick={() => { setisHidden(!isHidden) }}
            >
                {(isHidden) ? 'Filters' : 'X'}
            </button>
            <div className="flex flex-wrap justify-center items-center space-x-4 mb-4">

                {/* Filter select options */}
                <div className={(isHidden) ? 'hidden' : null}>

                    <select
                        className="border p-2"
                        value={filters.storage}
                        onChange={(e) => handleFilterChange('storage', e.target.value)}
                    >
                        <option value="">Select Storage</option>
                        <option value={32}>32 GB</option>
                        <option value={64}>64 GB</option>
                        <option value={128}>128 GB</option>
                        <option value={256}>256 GB</option>
                        <option value={512}>512 GB</option>
                        {/* Add more options as needed */}
                    </select>

                    <select
                        className="border p-2"
                        value={filters.memory}
                        onChange={(e) => handleFilterChange('memory', e.target.value)}
                    >
                        <option value="">Select Memory</option>
                        <option value="32 GB">32 GB</option>
                        <option value="64 GB">64 GB</option>
                        <option value={"128 GB"}>128 GB</option>
                        <option value={"256 GB"}>256 GB</option>
                        <option value={"512 GB"}>512 GB</option>
                        {/* Add more options as needed */}
                    </select>
                    <div className="flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="200000"
                            step="1000"
                            value={filters.price}
                            onChange={(e) => handleFilterChange('price', e.target.value)}
                            className="custom-range"
                        />
                        <input
                            type="text"
                            placeholder="Enter Price"
                            value={filters.price}
                            onChange={(e) => handleFilterChange('price', e.target.value)}
                            className="border p-2 mr-2"
                        />


                    </div>


                    <select
                        className="border p-2"
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                        <option value="">Select Type</option>
                        <option value="SmartPhone">SmartPhone</option>
                        <option value="OtherType">OtherType</option>
                        {/* Add more options as needed */}
                    </select>
                    {/* Apply filter button */}
                    <div className='flex items-center justify-center'>
                        <button
                            className="bg-blue-500 px-4 py-2  text-white p-2 rounded"
                            onClick={applyFilters}
                        >
                            Apply Filters
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 m-4 p-2 rounded"
                            onClick={() => setFilters({ storage: '', memory: '', price: '', type: '' })}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white flex flex-wrap justify-evenly py-4 sm:py-2">
                {filteredData.map((item, index) => (
                    <CardComponent
                        key={index}
                        price={item.price}
                        name={item.name}
                        OS={item.OS}
                        imgURL={item.imgURL}
                        memory={item.memory}
                        processor={item.processor}
                        type={item.type}
                        _id={item._id}
                    />
                ))}
            </div>
        </>
    );
}
