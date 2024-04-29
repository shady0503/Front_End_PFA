import ProductsList from "./ProductsList";
import Filter from "./Filter";
import "./ProductsList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "../dataContext";



export default function Laptops(props) {
    const { data } = useContext(DataContext);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState({
        Brand: [],
        Price: [],
        Processor: [],
        Memory: [],
        Storage: [],
        Graphic_Cards: [],
    });
    if (!data) return null;

    const productsList = useMemo(() => {
        return props.slug.reduce((acc, currentSlug) => {
            return data[currentSlug] ? [...acc, ...data[currentSlug]] : acc;
        }, []);
    }, [data, props.slug]);

    useEffect(() => {
        setProducts(productsList);
    }, [productsList]);

    const resetFilters = () => {
        setChecked({
            Brand: [],
            Price: [],
            Processor: [],
            Memory: [],
            Storage: [],
            Graphic_Cards: [],
        });
        setProducts(productsList);
    };
    
    const handleFilterChange = (filters) => {
        const result = productsList.filter(product => {
            // Filter by Price
            const productPrice = parseFloat(product.price.replace(/[^0-9.]/g, ""));
            const priceFilterPassed = !filters.Price.length || filters.Price.some(range => {
                const [minPrice, maxPrice] = range.replace(/[^0-9-]/g, '').split('-').map(Number);
                return productPrice >= minPrice && productPrice <= maxPrice;
            });
    
            // Filter by Brand
            const brandFilterPassed = !filters.Brand.length || filters.Brand.includes(product.name.split(' ')[0]);
    
            // Filter by Memory
            const memoryFilterPassed = !filters.Memory.length || filters.Memory.some(memory => 
                product.specifications.some(spec => spec.PERFORMANCE && spec.PERFORMANCE.some(perf => perf['RAM'] && perf['RAM'].includes(memory)))
            );
    
            // Filter by Storage
            const storageFilterPassed = !filters.Storage.length || filters.Storage.some(storage => 
                product.specifications.some(spec => spec.PERFORMANCE && spec.PERFORMANCE.some(perf => perf['Storage'] && perf['Storage'].includes(storage)))
            );
    
            // Filter by Processor
            const processorFilterPassed = !filters.Processor.length || filters.Processor.some(proc => 
                product.specifications.some(spec => spec.PERFORMANCE && spec.PERFORMANCE.some(perf => perf['Processor'] && perf['Processor'].includes(proc)))
            );
    
            // Filter by Graphics Card
            const graphicsFilterPassed = !filters.Graphic_Cards.length || filters.Graphic_Cards.some(gc => 
                product.specifications.some(spec => spec.PERFORMANCE && spec.PERFORMANCE.some(perf => perf['Graphics card'] && perf['Graphics card'].includes(gc)))
            );
    
            return priceFilterPassed && brandFilterPassed && memoryFilterPassed && storageFilterPassed && processorFilterPassed && graphicsFilterPassed;
        });
        setProducts(result);
    };
    

    return (
        <div className="laptops-page">
            {props.filter === "True" ? <Filter onFilterChange={handleFilterChange} checked={checked} setChecked={setChecked} /> : ""}
            <div className="product-container">
                <ProductsList productsList={products} slug={props.slug} deals={props.filter } resetFilters={resetFilters}
></ProductsList>
            </div>
        </div>
    );
}
