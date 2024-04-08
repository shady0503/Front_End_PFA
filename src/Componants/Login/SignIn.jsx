import './logIn.css'


export default function SignIn(){
    return(
        <div className='Login-Container'>
            <div>
            <form className="Sign-in-form">
                    <h3>Sign Up Here</h3>

                    <label htmlFor="new-username">Username or Email</label>
                    <input type="text" placeholder="Email or Phone" id="new-username" />

                    <label htmlFor="new-password">Password</label>
                    <input type="password" placeholder="Password" id="new-password" />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" id="confirm-password" />
                    <div className="sign-up-btn">
                        <label htmlFor="Sign-in"> Already Have an Account ?</label>
                        <button className='btn' type='Sign up' id='Sign-in' onClick={()=>setNew(!New)}>Log In</button>
                    </div>
                    <button className="login-button btn fs-4 fw-bold rounded-pill px-5 py-1">Sign Up</button>
                    <div className="social">

                        <button className="go btn rounded-pill">
                            <FontAwesomeIcon icon={faGoogle} className="icon svg-inline--fa " /> Google
                        </button>
                        <button className="fb btn rounded-pill"><FontAwesomeIcon className="icon fo" icon={faFacebook} /> Facebook</button>
                    </div>
                </form>
            </div>
        </div>
    )

}