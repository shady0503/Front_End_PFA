import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import './MainNavbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';



export default function MainNavbar({ setOpen }) {
    const menu = ['home', 'laptops', 'phones', 'accessories', 'Deals', 'support', 'Log In']
    return (
        <div className='navbar'>
            <span onClick={() => { setOpen(false) }}>X</span>
            <div className='logo-container'>
                <img src={logo} alt="" className='logo' />
                <h6>Republic Of Gamers</h6>
            </div>

            <div className='main-navbar'>
                <ul className='navbar-nav'>
                    {menu.map((item) => {
                        return (
                            <li className='navbar-item' key={item}>
                                <Link to={`/Front_End_PFA/${item.replace(/\s+/g, '')}`} className='navbar-link'>{item}
                                    {(item === 'laptops') && (
                                        <ul className='dropdown'>
                                            <li className='dropdown-item'><Link to="/Front_End_PFA/Gaming_Laptops/">Gaming Laptops</Link></li>
                                            <li className='dropdown-item'><Link to="/Front_End_PFA/Gaming_Desktop/">Gaming Desktop</Link></li>
                                        </ul>
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="second-navbar">
                <ul className='navbar-nav'>
                    <li className='navbar-item'><Link><FontAwesomeIcon className="icn" icon={faQuestion} /></Link></li>
                    <li className='navbar-item'><Link to="/Front_End_PFA/Cart"><FontAwesomeIcon className="icn" icon={faCartShopping}></FontAwesomeIcon></Link></li>
                    <li className='navbar-item'><Link to="/Front_End_PFA/Dashboard"><FontAwesomeIcon className="icn" icon={faUser} /></Link></li>
                </ul>
            </div>
        </div>
    )
}
