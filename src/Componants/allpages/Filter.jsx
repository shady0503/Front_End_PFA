import React, { useState, useRef, useCallback, useEffect } from 'react';
import './Filter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function Filter({onFilterChange, checked, setChecked}) {


    useEffect(() => {
        onFilterChange(checked);
    }, [checked]);

    const computePriceRanges = (prices) => {
        const maxPrice = Math.max(...prices.map(price => parseFloat(price.replace(/[^0-9.]/g, ''))));
        const rangeSize = 1000;
        let ranges = [];
        for (let i = 0; i < maxPrice; i += rangeSize) {
            let upperBound = i + rangeSize - 1;
            if (upperBound > maxPrice) upperBound = maxPrice;
            ranges.push(`£${i} - £${upperBound}`);
        }
        return ranges;
    };

    const initialPrices = [
        '£799.00', '£899.00', '£999.00',
        '£1,029.00', '£1,062.00', '£1,099.00',
        '£1,149.00', '£1,169.00', '£1,199.00',
        '£1,299.00', '£1,369.00', '£1,399.00',
        '£1,499.00', '£1,549.00', '£1,599.00',
        '£1,619.00', '£1,699.00', '£1,849.00',
        '£1,899.00', '£2,299.00', '£2,470.00',
        '£2,499.00', '£2,599.00', '£2,649.00',
        '£2,699.00', '£2,799.00', '£2,849.00',
        '£2,899.00', '£3,299.00', '£3,399.00',
        '£3,699.00', '£3,799.00', '£3,999.00'
    ];

    const priceRanges = computePriceRanges(initialPrices);


    const [openFilter, setOpenFilter] = useState(false)

    const filters = {
        Price: priceRanges,
        Brand: ['ASUS', 'MEDION', 'PCSPECIALIST', 'MSI', 'LENOVO', 'ACER', 'PC'],
        Memory: [
            '16 GB DDR4',
            '16 GB DDR5',
            '32 GB DDR4',
            '32 GB DDR5',
            '64 GB DDR5'
        ],
        Storage: [
            '512 GB SSD',
            '1 TB HDD',
            '1 TB SSD',
            '2 TB HDD',
            '2 TB SSD',
        ],
        Processor:[
            'AMD Ryzen 5',
            'AMD Ryzen 7',
            'AMD Ryzen 9',
            'Intel® Core™ i5',
            'Intel® Core™ i7',
            'Intel® Core™ i9'
        ] ,
        Graphic_Cards: [
            '- AMD Radeon RX 7700 XT',
            '- AMD Radeon RX 7800 XT',
            '- AMD Radeon RX 7900 XTX',
            '- NVIDIA GeForce RTX 3050',
            '- NVIDIA GeForce RTX 3060',
            '- NVIDIA GeForce RTX 3060 Ti',
            '- NVIDIA GeForce RTX 4060',
            '- NVIDIA GeForce RTX 4060 Ti',
            '- NVIDIA GeForce RTX 4070',
            '- NVIDIA GeForce RTX 4070 Ti',
            '- NVIDIA GeForce RTX 4070 Ti SUPER',
            '- NVIDIA GeForce RTX 4080',
            '- NVIDIA GeForce RTX 4080 SUPER',
            '- NVIDIA GeForce RTX 4090',
            '- NVIDIA GeForce RTX 4090 VENTUS 3X'
        ]
    }

    const initialOpenSections = new Set(Object.keys(filters));
    const [openSections, setOpenSections] = useState(initialOpenSections);
    const filterRef = useRef(null);





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
            const updatedItems = itemsForFilter.includes(value) ?
                itemsForFilter.filter(item => item !== value) :
                [...itemsForFilter, value];
            return { ...prevItems, [filterKey]: updatedItems };
        });
    }, []);

    useEffect(() => {
        onFilterChange(checked);
    }, [checked]);

    function formatCamelCaseToTitle(text) {
        return text
            .replace(/_/g, ' ')
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .replace(/^./, str => str.toUpperCase());
    }
    return (
        <div className="Filter-Container" ref={filterRef}
            style={{
                Height: openFilter ? '120dvw' : '50px'
            }}>
            <h4 onClick={() => {
                if (window.innerWidth < 1200) {
                    setOpenFilter(!openFilter);
                }
            }} style={
                { border: openFilter ? '' : 'none' }}>Filters
                <FontAwesomeIcon icon={faAngleDown} style={{
                    display: window.innerWidth < 1200 ? 'block' : 'none',
                    transform: openFilter ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease'
                }} />

            </h4>

            {window.innerWidth < 1200 ?
                openFilter && <div>
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
                                                    defaultChecked={checked[filterKey].includes(value)}
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
                :

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
                                                    checked={checked[filterKey]?.includes(value)}
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
            }
        </div>
    );
}
