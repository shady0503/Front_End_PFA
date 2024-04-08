import { useContext } from "react";
import pc from "../../assets/pc.webp"
import { Link } from 'react-router-dom';
import { DataContext } from "../dataContext";

export default function Articles(props) {
    const { addToCart } = useContext(DataContext)

    if (!props.item) {
        return null;
    }


    const item = props.item

    const handleClick = (item) => {
        addToCart(item)
    }
    return (
        <div className="article">
            <div className="img-title-container">
                <h3 className="title">{item.name}</h3>

                <Link to='/LandingPage' >
                    <img src={pc} alt="" />
                </Link>
            </div>
            <div className="layer">
                <div className="d-flex flex-end w-100 ajout">
                    <p>{item.description}</p>
                    <h2 className="price">{item.price}</h2>
                    <button className="btn article-button fw-bold rounded-pill" type="button" onClick={() => handleClick(item)} >Add to Cart</button>
                </div>
            </div>
        </div>
    )
}