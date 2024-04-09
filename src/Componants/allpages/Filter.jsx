import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Filter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function Filter() {
    const filters = {
        brands: ["Asus", "HP", "Lenovo", "MSI"],
        prices: ["0-2000$", "2000$-4000$", "Greater than 4000$"],
        processorTypes: ["Intel Core i5", "Intel Core i7", "AMD Ryzen 5", "AMD Ryzen 7"],
        ramOptions: ["8GB", "16GB", "32GB", "64GB"],
        storageTypes: ["SSD", "HDD", "SSD + HDD"],
        screenSizes: ["13 inches", "14 inches", "15.6 inches", "17.3 inches"],
        gpuTypes: ["NVIDIA GeForce", "AMD Radeon", "Integrated"],
    };

    const [openSection, setOpenSection] = useState(null);
    const filterRef = useRef(null);
    const [checked, setChecked] = useState(
        {
            brands: [],
            prices: [],
            processorTypes: [],
            ramOptions: [],
            storageTypes: [],
            screenSizes: [],
            gpuTypes: [],
        }
    )

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setOpenSection(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterRef]);

    const toggleSection = (key) => {
        setOpenSection(currentOpenSection => currentOpenSection === key ? null : key);
    }
    const handleCheck = useCallback((filterKey, value) => {
        setChecked(prevItems => {
            console.log("Before update:", prevItems);
    
            const itemsForFilter = prevItems[filterKey] || [];
            
            let updatedItems;
            if (itemsForFilter.includes(value)) {
                updatedItems = itemsForFilter.filter(item => item !== value);
            } else {
                updatedItems = [...itemsForFilter, value];
            }
    
            const updatedState = { ...prevItems, [filterKey]: updatedItems };
            console.log("After update:", updatedState);
            return updatedState;
        });
    }, []);
    
    
    

    return (
        <div className="Filter " ref={filterRef}>
            <ul className='filters'>
                {Object.keys(filters).map((filterKey, index) => (
                    <li key={index} className="Filter-section">
                        <button className="btn filter-title" onClick={() => toggleSection(filterKey)}>
                            <h6>{filterKey}</h6><FontAwesomeIcon className="arrow" icon={faAngleDown} />
                        </button>
                        {openSection === filterKey && (
                            <ul className="Filter-content">
                                {filters[filterKey].map((value, valueIndex) => (
                                    <li key={valueIndex} className='filter-values'>
                                        <label htmlFor={value}>
                                            <input type="checkbox" value={value} id={`${filterKey}-${valueIndex}`}
                                            checked={checked[filterKey].includes(value)}

                                            onChange={()=>{handleCheck(filterKey, value)}} />
                                            {value}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
