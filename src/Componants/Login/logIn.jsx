import '@fortawesome/fontawesome-free/css/all.min.css';
import "./LogIn.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

function LogIn() {
    const [isNew, setIsNew] = useState(false)
    return (
        <div className="Login-Container">
            <div>
                {isNew ?
                    <form className="Sign-in-form">
                        <h3>Sign Up Here</h3>

                        <label htmlFor="new-username">Username or Email</label>
                        <input type="text" placeholder="Email or Phone" id="new-username" />

                        <label htmlFor="new-password">Password</label>
                        <input type="password" placeholder="Password" id="new-password" />

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" id="confirm-password" />
                        <div className="sign-up-btn">
                            <label htmlFor="log-in"> Already Have an Account ?</label>
                            <button className='btn log-in' type='button' id='log-in' onClick={(e) => {
                                e.preventDefault()

                                setIsNew(false)
                            }}>Log In</button>
                        </div>
                        <button className="login-button btn fs-4 fw-bold rounded-pill px-5 py-1">Sign Up</button>
                        <div className="social">

                            <button className="go btn rounded-pill">
                                <FontAwesomeIcon icon={faGoogle} className="icon svg-inline--fa " /> Google
                            </button>
                            <button className="fb btn rounded-pill"><FontAwesomeIcon className="icon fo" icon={faFacebook} /> Facebook</button>
                        </div>
                    </form>


                    :



                    <form className="Sign-in-form">
                        <h3>Login Here</h3>

                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Email or Phone" id="username" />

                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" id="password" />
                        <div className="sign-up-btn">
                            <label htmlFor="Sign-up"> New user ?</label>
                            <button className='btn' type='button' id='Sign-up' onClick={(e) => {
                                e.preventDefault()
                                setIsNew(true)
                            }}>Sign up</button>
                        </div>
                        <button className="login-button btn fs-4 fw-bold rounded-pill px-5 py-1">Log In</button>
                        <div className="social">

                            <button className="go btn rounded-pill">
                                <FontAwesomeIcon icon={faGoogle} className="icon svg-inline--fa " /> Google
                            </button>
                            <button className="fb btn rounded-pill"><FontAwesomeIcon className="icon fo" icon={faFacebook} /> Facebook</button>
                        </div>
                    </form>}
            </div>

        </div>
    );
}

export default LogIn;
