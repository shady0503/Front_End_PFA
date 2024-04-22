import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import './MainNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faQuestion } from '@fortawesome/free-solid-svg-icons';

export default function MainNavbar({ setOpen }) {
    const menu = [
        'home',
        'phones',
        {
            key: 'laptops',
            options: ['Gaming Laptops', 'Gaming Desktop']
        },
        'accessories',
        'Deals',
        'support',
        'Log In'
    ];

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
                        if (typeof item === 'string') {
                            return (
                                <li className='navbar-item' key={item}>
                                    <Link to={`/Front_End_PFA/${item.replace(/\s+/g, '')}`} className='navbar-link' onClick={() => {
                                        if (window.innerWidth < 1250) {
                                            setOpen(false);
                                        }
                                    }}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            );
                        } else {
                            return (
                                <li className='navbar-item' key={item.key}>
                                    <div className='navbar-link'>{item.key}
                                        <ul className='dropdown'>
                                            {item.options.map(option => (
                                                <li key={option} className='dropdown-item'>
                                                    <Link to={`/Front_End_PFA/${option.replace(/\s+/g, '_')}/`} onClick={() => {
                                                        if (window.innerWidth < 1250) {
                                                            setOpen(false);
                                                        }
                                                    }}
                                                    >
                                                        {option}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>

            <div className="second-navbar">
                <ul className='navbar-nav'>
                    <li className='navbar-item'><Link to="#"><FontAwesomeIcon className="icn" icon={faQuestion} /></Link></li>
                    <li className='navbar-item'><Link to="/Front_End_PFA/Cart"><FontAwesomeIcon className="icn" icon={faCartShopping}></FontAwesomeIcon></Link></li>
                    <li className='navbar-item'><Link to="/Front_End_PFA/Dashboard"><FontAwesomeIcon className="icn" icon={faUser} /></Link></li>
                </ul>
            </div>
        </div>
    );
}
