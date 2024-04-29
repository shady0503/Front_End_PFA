import React, { useContext, useMemo, useState } from 'react';
import Articles from './Articles';
import { DataContext } from '../dataContext';
import { Link } from 'react-router-dom';

function ProductsList({ slug, productsList, resetFilters}) {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 15;

    if (productsList.length===0) return <div style={{display:"flex",
    alignItems: "center",
    justifyContent:"center",
    flexDirection:"column",
    padding: 200,
    border:"solid 1px Black",
    borderRadius:"20px",
    background: 'rgb(255,255,255)',
    }}><h1>No Products matches your Filters
        </h1>
        <button className='btn' onClick={()=>{resetFilters()}}>Reset Filters</button></div>;

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
                <Articles key={item.id} slug={slug} item={item} resetFilters={resetFilters} />
            ))}
            <Pagination itemsPerPage={itemsPerPage} totalItems={productsList.length} paginate={paginate} />
        </div>
    );
}

export default ProductsList;
