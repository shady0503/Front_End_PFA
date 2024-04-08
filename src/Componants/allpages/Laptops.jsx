// Laptops.js
import ProductsList from "./ProductsList";
import Filter from "./Filter";
import "./ProductsList.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Laptops(props) {

    return (
        <div className="laptops-page">
            {props.filter === "True" ? <Filter /> : console.log("none")}
            <div className="product-container container-fluid">
                <ProductsList deals={props.filter}></ProductsList>
            </div>
        </div>
    );
}
