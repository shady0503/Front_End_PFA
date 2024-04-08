import { useState } from "react"
import './burger.css'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faQuestion } from '@fortawesome/free-solid-svg-icons';


function NavBar(){
    const [burger_class, setBurgerClass] = useState('burger-bar unclicked')
    const [menu_class, setMenuClass] = useState('menu hidden')
    const [isMenuClicked, setisMenuClicked] = useState(false)

    const updateMenu = ()=>{
        if(!isMenuClicked){
            setBurgerClass('burger-bar clicked')
            setMenuClass('menu  visible')
        }
        else{
            setBurgerClass('burger-bar unclicked')
            setMenuClass('menu hidden')
        }
        setisMenuClicked(!isMenuClicked)
    }

    return(
        <div style={{width: '100%', height:'100vh'}}>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} >Mnu 1</div>
                    <div className={burger_class} >MZSMKZQQ</div>
                    <div className={burger_class} >QSDIKQDSQ</div>
                </div>
            </nav>

            <div className={menu_class}><nav>
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
                </nav></div>
        </div>
    )
}

export default NavBar