import '@fortawesome/fontawesome-free/css/all.min.css';
import "./LogIn.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../dataContext';
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const User_regex = /^([a-zA-Z0-9_\-]+|[\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3})$/;
    const Email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const pss_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const { setConnected } = useContext(DataContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNew, setIsNew] = useState(false);

    const [validUser, setValidUser] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('isNew', JSON.stringify(isNew));
    }, [isNew]);

    const handleInputChange = (setter, value) => {
        setter(value);
        if (setter === setUsername) {
            validateUser(value);
        } else if (setter === setPassword) {
            validatePassword(value);
        } else if (setter === setConfirmPassword) {
            checkPasswordsMatch(password, value);
        }
    };

    const validateUser = (value) => {
        setValidUser(User_regex.test(value));
    };

    const validatePassword = (value) => {
        setValidPass(pss_regex.test(value) && value.length >= 8);
        checkPasswordsMatch(value, confirmPassword);
    };

    const checkPasswordsMatch = (passwordValue, confirmPasswordValue) => {
        setPasswordMatch(passwordValue === confirmPasswordValue);
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        validateUser(username);
        validatePassword(password);
        checkPasswordsMatch(password, confirmPassword);

        if (validUser && validPass && passwordMatch) {
            try {
                const isEmail = Email_regex.test(username);
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: isEmail ? username : undefined, // Assign email if username is a valid email
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data.message);
                    localStorage.setItem('token', data.token);
                    setConnected(true);
                    navigate('/Front_End_PFA/home'); // Correct usage for internal navigation
                } else {
                    setErrorMessage(data.message);
                }
            } catch (err) {
                console.log(err.message);
                setErrorMessage('An error occurred. Please try again.');
            }
        } else {
            console.log('Sign up validation failed');
            setErrorMessage('Validation failed. Please check your input.');
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        validateUser(username);
        validatePassword(password);

        if (validUser && validPass) {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data.message);
                    localStorage.setItem('token', data.accessToken);
                    setConnected(true);
                    navigate('/Front_End_PFA/home'); // Correct usage for internal navigation
                } else {
                    setErrorMessage(data.message);
                }
            } catch (error) {
                console.log(error.message);
                setErrorMessage('An error occurred. Please try again.');
            }
        } else {
            console.log('Login validation failed');
            setErrorMessage('Validation failed. Please check your input.');
        }
    };

    return (
        <div className="Login-Container">
            <div>
                {isNew ? (
                    <form className="Sign-in-form" onSubmit={handleSignIn}>
                        <h3>Sign Up Here</h3>
                        <label htmlFor="new-username">Username or Email</label>
                        <input type="text" placeholder="Email or Phone" id="new-username" autoComplete='username ' 
                            value={username} onChange={(e) => handleInputChange(setUsername, e.target.value)} />
                        {!validUser && <p className="error">No spaces allowed and must be a valid username or Gmail address.</p>}

                        <label htmlFor="new-password">Password</label>
                        <input type="password" placeholder="Password" id="new-password" autoComplete='new-password'
                            value={password} onChange={(e) => handleInputChange(setPassword, e.target.value)} />
                        {!validPass && <p className="error">Password must be at least 8 characters and include numbers and letters.</p>}

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" id="confirm-password" autoComplete='new-password'
                            value={confirmPassword} onChange={(e) => handleInputChange(setConfirmPassword, e.target.value)} />
                        {!passwordMatch && <p className="error">Passwords do not match.</p>}

                        {errorMessage && <p className="error">{errorMessage}</p>}

                        <div className="sign-up-btn">
                            <label htmlFor="Sign-up"> Already signed up?</label>
                            <button className='btn' type='button' id='Sign-up' onClick={() => setIsNew(false)}>Log In</button>
                        </div>

                        <button type="submit" className="login-button btn fs-4 fw-bold rounded-pill px-5 py-1">Sign Up</button>
                    </form>
                ) : (
                    <form className="Sign-in-form" onSubmit={handleLogin}>
                        <h3>Login Here</h3>

                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Email or Phone" id="username" autoComplete="username"value={username} onChange={(e) => handleInputChange(setUsername, e.target.value)} />
                        {!validUser && <p className="error">No spaces allowed and must be a valid username or Gmail address.</p>}

                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" id="password" value={password} autoComplete='current-password' onChange={(e) => handleInputChange(setPassword, e.target.value)} />
                        
                        {errorMessage && <p className="error">{errorMessage}</p>}

                        <div className="sign-up-btn">
                            <label htmlFor="Sign-up"> New user?</label>
                            <button className='btn' type='button' id='Sign-up' onClick={() => setIsNew(true)}>Sign Up</button>
                        </div>
                        <button className="login-button btn fs-4 fw-bold rounded-pill px-5 py-1">Log In</button>
                        <div className="social">
                            <button className="go btn rounded-pill">
                                <FontAwesomeIcon icon={faGoogle} className="icon svg-inline--fa " /> Google
                            </button>
                            <button className="fb btn rounded-pill">
                                <FontAwesomeIcon className="icon fo" icon={faFacebook} /> Facebook
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default LogIn;
