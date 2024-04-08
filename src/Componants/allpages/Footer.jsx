import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Footer.css'
export default function Footer(){
    return(
        <footer className=' Container-fluid bg-gray-200 w-100 d-flex flex-column'>
            <div className='d-flex flex-start container-fluid justify-content-evenly w-100 h-100 Contenoir' >
                <div className='Company-info d-flex flex-column footer-container '>
                    <h1> About us</h1>
                        <ul className='About-us d-flex flex-column flex-start list'>
                            <li className='about-us-element list-element'>
                                <Link className="list-link" to="/">Our Story</Link>
                            </li>
                            <li className='about-us-element list-element'>
                                <Link className="list-link" to="/">Meet The Team</Link>
                            </li>
                            <li className='about-us-element list-element'>
                                <Link className="list-link" to="/">Careers</Link>
                            </li>
                            <li className='about-us-element list-element'>
                                <Link className="list-link" to="/">Press & Media</Link>
                            </li>
                            <li className='about-us-element list-element'>
                                <Link className="list-link" to="/">Our Goals</Link>
                            </li>
                        </ul>
                </div>


                <div className='Customer-info d-flex flex-column footer-container'>
                    <h1> Customer Service</h1>
                        <ul className='Customer-info d-flex flex-column flex-start list '>
                            <li className='Customer-info-element list-element'>
                                <Link className="list-link" to="/">Contact Us</Link>
                            </li>
                            <li className='Customer-info-element list-element'>
                                <Link className="list-link" to="/">FAQs</Link>
                            </li>
                            <li className='Customer-info-element list-element'>
                                <Link className="list-link" to="/">Shipping & Delivery</Link>
                            </li>
                            <li className='Customer-info-element list-element'>
                                <Link className="list-link" to="/">Returns & Exchanges</Link>
                            </li>
                            <li className='Customer-info-element list-element'>
                                <Link className="list-link" to="/">Size Guide</Link>
                            </li>
                        </ul>
                </div>

                <div className='Policies d-flex flex-column footer-container'>
                    <h1> Policies & Information</h1>
                        <ul className='Policies-info d-flex flex-column flex-start list'>
                            <li className='Policies-info-element list-element'>
                                <Link className="list-link" to="/">Privacy Policy</Link>
                            </li>
                            <li className='Customer-info-element list-element'>
                                <Link  className="list-link" to="/">Terms of Service</Link>
                            </li>
                            <li className='Customer-info-element list-element'>
                                <Link className="list-link" to="/">Accessibility</Link>
                            </li>
                        </ul>
                </div>
                

            </div>
            <div className='Copy-Right'>
                <h1>
                © 1998 - 2024 REPUBLIC OF GAMERS ALL RIGHTS RESERVED.
                </h1>
                <p>
                All images appearing on this website are copyright Republic of Gamers Inc. Any unauthorized use of its logos and other graphics is forbidden. Prices and specifications are subject to change without notice. Republic of Gamers UK is not responsible for any typo, photograph or program errors, and reserves the right to cancel any incorrect orders. System images are an example system highlighting your chosen case. Internal components and lighting are entirely dependent on the specification of the components selected and may not be as displayed. NXPower (UK) Ltd t/as Republic of Gamers UK FRN:671126 are authorized and regulated by the Financial Conduct Authority. We are a credit broker not a lender - credit is subject to status and affordability, and is provided by Mitsubishi HC Capital UK PLC. Terms & Conditions Apply.
                </p>
            </div>
        </footer>
    )
}