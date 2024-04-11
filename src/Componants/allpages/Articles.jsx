import { useContext, useEffect, useState } from "react";
import pc from "../../assets/pc.webp"
import logo from "../../assets/logo.webp"
import { Link } from 'react-router-dom';
import { DataContext } from "../dataContext";

export default function Articles(props) {
    const [quantity, setQuantity] = useState(1)
    const [img, setImg] = useState(pc)
    const [secondary, setSecondary] = useState([logo, logo, logo])
    const { addToCart } = useContext(DataContext)
    const [open, setOpen] = useState(window.innerWidth <= 900);

    if (!props.item) {
        return null;
    }
    const handleImgChange = (index) => {
        let main = secondary[index];
        console.log(main)
        const changedSet = [...secondary]
        changedSet[index] = img
        console.log(changedSet)
        setImg(main);
        setSecondary(changedSet);
    };


    const item = props.item

    const handleClick = (item) => {
        addToCart(item) * quantity
    }


    useEffect(() => {
        let previousWidth = window.innerWidth;
        const threshold = 900;

        const handleResize = () => {
            const currentWidth = window.innerWidth;
            if (previousWidth > threshold && currentWidth <= threshold) {
                setOpen(true);
            }
            else if (previousWidth <= threshold && currentWidth > threshold) {
                setOpen(false);
            }
            previousWidth = currentWidth;
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="article">
            <div className="img-container">
                {open && <h6>{item.name}</h6>
                }
                <img src={img} alt="" className="main-img" />
                <div className="catalogue">
                    {secondary.map((img, index) => (
                        <img key={index} src={img} alt="" className="secondary" onClick={() => handleImgChange(index)} />
                    ))}
                </div>
            </div>

            <div className="product-info" style={{display: (!open ? "" : "none")}}>
                <h6>{item.name}</h6>
                <p>{item.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid officiis laborum, temporibus magnam odit ad commodi numquam voluptatem fugit delectus recusandae sed sequi, tempora itaque eius dolorem rem molestias debitis!</p>
            </div>

            <div className="actions">
                <div className="paiement-info">
                    <h3 className="price">${item.price}</h3>
                    <span>or pay ${((item.price / 36) * 1.1).toFixed(2)} over 36 months </span>
                </div>
                <div className="quantity">
                    Amount:
                    <button className="btn quantity-btn" onClick={() => { setQuantity(prev => prev === 1 ? 1 : prev - 1) }}>-</button>
                    <p className="number">{quantity}</p>
                    <button className="btn quantity-btn" onClick={() => { setQuantity(prev => prev + 1) }}>+</button>
                </div>
                <div className="controls">
                    <button className="btn addToCart">Add to cart</button>
                    <button className="btn">View Product</button>
                </div>
            </div>
        </div>
    )
}