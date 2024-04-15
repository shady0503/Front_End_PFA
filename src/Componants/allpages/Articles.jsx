import { useContext, useEffect, useState } from "react";
import pc from "../../assets/pc.webp"
import logo from "../../assets/logo.webp"
import { Link } from 'react-router-dom';
import { DataContext } from "../dataContext";

export default function Articles(props) {
    if (!props.item) {
        return <div>Loading ...</div>;
    }
    const { addToCart } = useContext(DataContext)

    const [quantity, setQuantity] = useState(1)
    const [img, setImg] = useState(props.item.mainImg)
    const [open, setOpen] = useState(window.innerWidth <= 900);


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





    const item = props.item
    const slug = props.slug

    const handleClick = (item, quantity) => {
            addToCart(item, quantity)
    }

    const normalizedPrice = item.price.replace(/[^0-9.-]+/g, '');
    const price = Number(normalizedPrice)


    return (
        <div className="article">
            <div className="img-container">
                {open && <h6>{item.name}</h6>
                }
                <img src={img} alt="" className="main-img" />
            </div>

            <div className="product-info" style={{ display: (!open ? "" : "none") }}>
                <h6>{item.name}</h6>
                {item.description.map((d,index)=>((<div key={index}>
                    <span>{d}</span>
                <br />
                </div>)
))}
            </div>

            <div className="actions">
                <div className="paiement-info">
                    <h3 className="price">{item.price}</h3>
                    <span>or pay {((price / 36) * 1.1).toFixed(2) } over 36 months </span>
                </div>
                <div className="quantity">
                    Amount:
                    <button className="btn quantity-btn" onClick={() => { setQuantity(prev => prev === 1 ? 1 : prev - 1) }}>-</button>
                    <p className="number">{quantity}</p>
                    <button className="btn quantity-btn" onClick={() => { setQuantity(prev => prev + 1) }}>+</button>
                </div>
                <div className="controls">
                    <button className="btn addToCart" onClick={() => handleClick(item, quantity)}>Add to cart</button>
                    <Link to={`/Front_End_PFA/${slug}/${item.id}`}><button className="btn">View Product</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}