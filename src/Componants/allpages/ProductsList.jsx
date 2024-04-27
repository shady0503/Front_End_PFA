import React, { useContext, useMemo, useState } from 'react';
import Articles from './Articles';
import { DataContext } from '../dataContext';
import { Link } from 'react-router-dom';

function ProductsList({ slug }) {
    const { data } = useContext(DataContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;  // Set number of items per page

    // Early return if no data is available
    if (!data) return null;

    // Compute filtered products list
    const productsList = useMemo(() => {
        return slug.reduce((acc, currentSlug) => {
            return data[currentSlug] ? [...acc, ...data[currentSlug]] : acc;
        }, []);
    }, [data, slug]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productsList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', 
        })
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav className='pagination-nav'>
                <ul className='pagination'>
                    {pageNumbers.map((number , index) => (
                        <li key={number} className='page-item'>
                            <Link onClick={() => paginate(number)} href='#!' className={`page-link btn ${number === currentPage ? 'page-link-active' : ''}`}>
                                {number}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    return (
        <div className='container-fluid-Articles'>
            {currentItems.map((item, index) => (
                <Articles key={item.id} slug={slug} item={item} />
            ))}
            <Pagination itemsPerPage={itemsPerPage} totalItems={productsList.length} paginate={paginate} />
        </div>
    );
}

export default ProductsList;
