import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Promotion.css';

import { Link } from 'react-router-dom';

import p1 from "../../assets/placeholder_promotion.webp";
import p2 from "../../assets/UK_AMD_Radeon_7600_XT_Gaming_PCs_.webp";
import p3 from "../../assets/UK_MSI_14th_Gen_Laptops_.webp";
import p4 from "../../assets/Winter_Deals.webp";

export default function Promotion() {
    const promotionsPicture = [p1, p2, p3, p4];
    const [currentPic, setCurrentPic] = useState(0);
    const promotionDetails = [
        { title: "Placeholder Promotion", description: "Check out our latest offers on placeholders!", link: "#" },
        { title: "AMD Radeon 7600 XT Gaming PCs", description: "Discover the power of AMD Radeon 7600 XT with our gaming PCs.", link: "#" },
        { title: "MSI 14th Gen Laptops", description: "Experience next-gen performance with MSI's 14th Gen Laptops.", link: "#" },
        { title: "Winter Deals", description: "Warm up with our hot deals this winter!", link: "#" },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            clickLeft();
        }, 5000);

        return () => clearTimeout(timer);
    });

    function clickRight() {
        setCurrentPic(currentPic < promotionsPicture.length - 1 ? currentPic + 1 : 0);
    }

    function clickLeft() {
        setCurrentPic(currentPic > 0 ? currentPic - 1 : promotionsPicture.length - 1);
    }

    return (
        <div className="promotion-container row  col-12 position-relative">
            <div className="position-absolute p-3 text-block">
                <h2>{promotionDetails[currentPic].title}</h2>
                <p>{promotionDetails[currentPic].description}</p>
                <Link to="LandingPage">
                    <button className="fs-4 fw-bold rounded-pill py-1 promotion-btn">Shop</button>
                </Link>            </div>
            <div
                className="image-container"
                style={{ backgroundImage: `url(${promotionsPicture[currentPic]})` }}
            >
                <button onClick={clickLeft} className="navigate left"><i className="fas fa-arrow-left"></i></button>
                <button onClick={clickRight} className="navigate right"><i className="fas fa-arrow-right"></i></button>
            </div>
        </div>
    );
}
