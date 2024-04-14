import Promotion from "./Promotion"
import Articles from "../allpages/Articles"
import '../allpages/Articles.css'
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from '../dataContext';

export default function HomePage() {
    let navigate = useNavigate()
    function handleClick1() {
        navigate('/Front_End_PFA/laptops')
    }

    function handleclick2() {
        navigate('/Front_End_PFA/Deals')
    }

    const { data } = useContext(DataContext)
    const { Gaming_Laptops, Phones, promotionItems, cartItems } = data
    const [item1, item2, item3] = [Gaming_Laptops[0], Gaming_Laptops[1], Phones[2]]
    return (
        <div className="container-fluid" >
            <Promotion />
            <h1 className='heading-title'>Featured Articles: </h1>
            <div className='article-list'>
                <Articles slug="Gaming_Laptops" key={1} item={item1}></Articles>
                <Articles slug="Gaming_Laptops" key={2} item={item2}></Articles>
                <Articles slug="Phones" key={3} item={item3}></Articles>

            </div>
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn fs-4 fw-bold rounded-pill px-5 py-1 button-custom" type="button" onClick={handleClick1}>Explore More</button>
            </div>
            <h1 className='heading-title'>Popular Articles: </h1>
            <div className='article-list'>
                <Articles slug="Gaming_Laptops" key={5} item={Gaming_Laptops[5]}></Articles>
                <Articles slug="Phones" key={6} item={Phones[6]}></Articles>
                <Articles slug="Gaming_Laptops" key={7} item={Gaming_Laptops[7]}></Articles>

            </div>
            <div className="d-flex justify-content-center align-items-center">

                <button className="btn fs-4 fw-bold rounded-pill px-5 py-1 button-custom mb-5" type="button" onClick={handleclick2}>Explore More</button>
            </div>


        </div>

    )
}