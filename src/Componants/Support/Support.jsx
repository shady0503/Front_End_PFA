import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faPhone, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faCodepen, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Support.css'
function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <section id="contact">
            <h1 className="section-header">Contact</h1>
            <div className="contact-wrapper">
                <form id="contact-form" className="form-horizontal" role="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="NAME"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-12">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="EMAIL"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <textarea
                        className="form-control"
                        rows="10"
                        placeholder="MESSAGE"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button className="btn w-100 mt-20"  id='btn' type="submit">
                            <FontAwesomeIcon icon={faPaperPlane} /><span className="send-text">SEND</span>
                    </button>
                </form>

                <div className="direct-contact-container">
                    <ul className="contact-list">
                        <li className="list-item"><FontAwesomeIcon icon={faMap} className="fa-2x" /><span className="contact-text place">City, Country</span></li>
                        <li className="list-item"><FontAwesomeIcon icon={faPhone} className="fa-2x" /><span className="contact-text phone"><a href="tel:0691828834" title="Give me a call">+212 691828834</a></span></li>
                        <li className="list-item"><FontAwesomeIcon icon={faEnvelope} className="fa-2x" /><span className="contact-text gmail"><a href="mailto:chaditaqi3@gmail.com" title="Send me an email">chaditaqi3@gmail.com</a></span></li>
                    </ul>

                    <hr />
                    <ul className="social-media-list">
                        <li><a href="#" target="_blank" className="contact-icon">
                            <FontAwesomeIcon icon={faGithub} aria-hidden="true" /></a>
                        </li>
                        <li><a href="#" target="_blank" className="contact-icon">
                            <FontAwesomeIcon icon={faCodepen} aria-hidden="true" /></a>
                        </li>
                        <li><a href="#" target="_blank" className="contact-icon">
                            <FontAwesomeIcon icon={faTwitter} aria-hidden="true" /></a>
                        </li>
                        <li><a href="#" target="_blank" className="contact-icon">
                            <FontAwesomeIcon icon={faInstagram} aria-hidden="true" /></a>
                        </li>
                    </ul>
                    <hr />

                    <div className="copyright">© ALL OF THE RIGHTS RESERVED</div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
