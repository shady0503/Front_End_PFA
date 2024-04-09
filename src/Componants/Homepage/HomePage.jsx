import Promotion from "./Promotion"
import Articles from "../allpages/Articles"
import '../allpages/Articles.css'
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from '../dataContext';

export default function HomePage() {
    let navigate = useNavigate()
    function handleClick(){
        navigate('laptops')
    }

    const { data } = useContext(DataContext)
    const {items, promotionItems, cartItems} = data 
    const [item1, item2, item3]= [items[0], items[1], items[2]]
    return (
        <div className="container-fluid" >
            <Promotion />
            <h1 className='heading-title'>Featured Articles: </h1>
            <div className='article-list'>
                <Articles  key={1} item={item1}></Articles>
                <Articles  key={2} item={item2}></Articles>
                <Articles  key={3} item={item3}></Articles>

            </div>
            <div className="d-flex justify-content-center align-items-center">
                    <button className="btn fs-4 fw-bold rounded-pill px-5 py-1 button-custom" type="button" onClick={handleClick}>Explore More</button>
            </div>
            <h1 className='heading-title'>Popular Articles: </h1>
            <div className='article-list'>
                <Articles  key={5} item={items[5]}></Articles>
                <Articles  key={6} item={items[6]}></Articles>
                <Articles  key={7} item={items[7]}></Articles>

            </div>
            <div className="d-flex justify-content-center align-items-center">
                <Link to="Deals">
                    <button className="btn fs-4 fw-bold rounded-pill px-5 py-1 button-custom mb-5" type="button">Explore More</button>
                </Link>            </div>


        </div>

    )
}