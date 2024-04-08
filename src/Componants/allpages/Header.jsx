import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';


export default function Header(props) {
    const [isShown, setIsShown] = useState(window.innerWidth >= 786);
    const isLogged = props.isLogged

    useEffect(() => {
        const handleResize = () => {
            setIsShown(window.innerWidth >= 1450);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    });
    return (
        <div className="container-fluid d-flex sticky-top header-container">
            {isShown && <div className="d-flex navbar-brand align-items-center Title-container">
                <img src={logo} alt="Logo" className="logo" />
                <h1 className="Title">Republic Of Gamers</h1>
            </div>}
            <div className='nav-container'>
                <nav>
                    <ul className='main-nav'>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/laptops">Laptops</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/phones">Phones</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/accessories">Accessories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/deals">Deals</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/support">Support</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Log in</Link>
                        </li>
                    </ul>
                </nav>
                <ul className='user-nav'>
                    <li><Link><FontAwesomeIcon className="icn" icon={faQuestion} /></Link></li>
                    <li><Link to="Cart"><FontAwesomeIcon className="icn" icon={faCartShopping}></FontAwesomeIcon></Link></li>
                    <li><Link to="/Dashboard"><FontAwesomeIcon className="icn" icon={faUser} /></Link></li>
                </ul>
            </div>


        </div>
    );
}
