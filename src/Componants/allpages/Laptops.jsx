import ProductsList from "./ProductsList";
import Filter from "./Filter";
import "./ProductsList.css";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Laptops(props) {

    return (
        <div className="laptops-page">
            {props.filter === "True" ? <Filter /> : ""}
            <div className="product-container container-fluid">
                <ProductsList slug={props.slug} deals={props.filter}></ProductsList>
            </div>
        </div>
    );
}
