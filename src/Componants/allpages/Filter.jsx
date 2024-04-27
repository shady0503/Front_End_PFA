import React, { useState, useRef, useCallback } from 'react';
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

    const initialOpenSections = new Set(Object.keys(filters));
    const [openSections, setOpenSections] = useState(initialOpenSections);
    const filterRef = useRef(null);
    const [checked, setChecked] = useState({
        brands: [],
        prices: [],
        processorTypes: [],
        ramOptions: [],
        storageTypes: [],
        screenSizes: [],
        gpuTypes: [],
    });

    const toggleSection = useCallback((key) => {
        setOpenSections(prevOpenSections => {
            const newOpenSections = new Set(prevOpenSections);
            if (newOpenSections.has(key)) {
                newOpenSections.delete(key);
            } else {
                newOpenSections.add(key);
            }
            return newOpenSections;
        });
    }, []);

    const handleCheck = useCallback((filterKey, value) => {
        setChecked(prevItems => {
            const itemsForFilter = prevItems[filterKey] || [];
            let updatedItems;
            if (itemsForFilter.includes(value)) {
                updatedItems = itemsForFilter.filter(item => item !== value);
            } else {
                updatedItems = [...itemsForFilter, value];
            }
            return { ...prevItems, [filterKey]: updatedItems };
        });
    }, []);

    function formatCamelCaseToTitle(text) {
        return text
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    }

    return (
        <div className="Filter-Container" ref={filterRef}>
            <h4>Filters</h4>
            <div>
                {Object.entries(filters).map(([filterKey, values]) => (
                    <div key={filterKey}>
                        <h6 onClick={() => toggleSection(filterKey)}>
                            {formatCamelCaseToTitle(filterKey)} <FontAwesomeIcon icon={faAngleDown} style={{
                                transform: openSections.has(filterKey) ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.3s ease'
                            }} />
                        </h6>
                        {openSections.has(filterKey) && (
                            <ul>
                                {values.map((value, index) => (
                                    <li key={`${filterKey}-${index}`} className='filter-values'>
                                        <label htmlFor={`${filterKey}-${index}`}>
                                            <input
                                                type="checkbox"
                                                value={value}
                                                id={`${filterKey}-${index}`}
                                                checked={checked[filterKey].includes(value)}
                                                onChange={() => handleCheck(filterKey, value)}
                                            />
                                            {value}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
