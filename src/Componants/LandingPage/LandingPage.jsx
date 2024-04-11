import './LandingPage.css'
import pc from "../../assets/pc.webp"
import logo from "../../assets/logo.webp"
import { useContext, useState } from 'react'
import { DataContext } from '../dataContext'
import {useParams} from 'react-router'
export default function LandingPage(props) {

    const { data, addToCart } = useContext(DataContext)
    const {items, promotionItems, cartItems} = data
    const {id} = useParams()

    const fetchItem = ()=> {
        const item = items.filter(product => product.id === id)
        return item
    }
    const [item] = fetchItem()

    const [secondary, setSecondary] = useState([logo, logo, logo])
    const [mainImg, setMainImg] = useState(pc)

    const handleChange = (index) => {
        let main = secondary[index];
        const changedSet = [...secondary]
        changedSet[index] = mainImg
        setMainImg(main);
        setSecondary(changedSet);
    };

    if (!item) {
        return null;
    }

    return (
        <div className="Container">
            <div className="img">
                <img src={mainImg} alt="" className='main-img'/>
                <div className="catalogue">
                    {secondary.map((img, index) => (
                        <img key={index} src={img} alt="" className="secondary" onClick={() => handleChange(index)} />
                    ))}
                </div>
            </div>

            <div className='description'>
                <h1 className='article-name'>{item.name} </h1>
                <div className='details'>
                    <p>{item.description}Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae placeat, nostrum accusamus,
                        esse eveniet corrupti illum at nesciunt laboriosam corporis ipsum exercitationem magni sed
                        aliquid omnis vero sint minus officiis?</p>
                    <h3 className='price'>{item.price}</h3>
                </div>
                <button className=' btn Landing-page-btn' onClick={()=>addToCart(item)}>Add To Cart</button>
            </div>
        </div>
    )
}