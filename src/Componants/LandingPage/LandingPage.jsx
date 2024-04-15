import './LandingPage.css'
import { useContext, useState } from 'react'
import { DataContext } from '../dataContext'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import Specs from './specs/Specs'
export default function LandingPage() {

    const { data, addToCart } = useContext(DataContext);
    const [item, setItem] = useState(null);
    const [secondary, setSecondary] = useState([]);
    const [mainImg, setMainImg] = useState('');
    const [isZoomed, setIsZoomed] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchItem = async () => {
            const allProducts = [...data.Gaming_Laptops, ...data.Phones, ...data.Gaming_Desktop];
        
            const filteredItems = allProducts.filter(product => product.id === id);
        
            if (filteredItems.length > 0) {
                return filteredItems[0];
            }
            return null;
        };
        
        fetchItem().then(fetchedItem => {
            if (fetchedItem) {
                setItem(fetchedItem);
                setMainImg(fetchedItem.mainImg);
                setSecondary([fetchedItem.mainImg, ...fetchedItem.imgs]);
            }
        });
        
    }, [id, data]);

    if (!item) {
        return <div>Loading...</div>;
    }

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsZoomed(false);
        }
    };


    const handleChange = (index) => {
        let main = secondary[index];
        setMainImg(main);
    };

    return (
        <div className="Container">
            {isZoomed && (
                <div className="overlay" onClick={handleBackgroundClick}>
                    <img src={mainImg} alt="" className="zoomed-img" onClick={toggleZoom} />
                </div>
            )}
            <div className="img">
                <img src={mainImg} alt="" className='main-img' onClick={toggleZoom} />
                <div className="catalogue">
                    {secondary.map((img, index) => (
                        <img key={index} src={img} alt="" className="secondary" onClick={() => handleChange(index)} />
                    ))}
                </div>
            </div>
            <div className='description'>
                <h1 className='article-name'>{item.name}</h1>
                <div className='details'>
                    {item.description.map((d, index) => (
                        <div key={index}>
                            <span>{d}</span>
                            <br />
                        </div>
                    ))}
                    <h3 className='price'>{item.price}</h3>
                </div>
                <button className='btn Landing-page-btn' onClick={() => addToCart(item, 1)}>Add To Cart</button>
            </div>

            <div className='specs-container'>
                <Specs item={item}></Specs>
            </div>
        </div>
    );
}