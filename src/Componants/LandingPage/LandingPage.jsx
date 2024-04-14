import './LandingPage.css'
import pc from "../../assets/pc.webp"
import logo from "../../assets/logo.webp"
import { useContext, useState } from 'react'
import { DataContext } from '../dataContext'
import {useParams} from 'react-router'
import { useEffect } from 'react'
export default function LandingPage(props) {

    const { data, addToCart } = useContext(DataContext);
    const [item, setItem] = useState(null);
    const [secondary, setSecondary] = useState([]);
    const [mainImg, setMainImg] = useState('');
    const { id } = useParams();
    
    useEffect(() => {
        const fetchItem = async () => {
            const filteredItems = data.items.filter(product => product.id === id);
            if (filteredItems.length > 0) {
                return filteredItems[0];
            }
            return null;
        };

        fetchItem().then(fetchedItem => {
            if (fetchedItem) {
                setItem(fetchedItem);
                setSecondary([...fetchedItem.imgs]);
                setMainImg(fetchedItem.mainImg);
            }
        });
    }, [id, data.items]);

    if (!item) {
        return <div>Loading...</div>;
    }

    const handleChange = (index) => {
        let main = secondary[index];
        const changedSet = [...secondary];
        changedSet[index] = mainImg;
        setMainImg(main);
        setSecondary(changedSet);
    };

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
                {item.description.map((d,index)=>((<div key={index}>
                    <span>{d}</span>
                <br />
                </div>)
))}
                    <h3 className='price'>{item.price}</h3>
                </div>
                <button className=' btn Landing-page-btn' onClick={()=>addToCart(item)}>Add To Cart</button>
            </div>
        </div>
    )
}