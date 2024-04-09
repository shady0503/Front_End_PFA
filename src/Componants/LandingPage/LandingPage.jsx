import p1 from '../../assets/logo.webp'
import './LandingPage.css'

export default function LandingPage(props) {
    return (
        <div className="Container">
            <div className="img">
                <img src={p1} alt="" />
            </div>

            <div className='description'>
                <h1 className='article-name'>Product Title</h1>
                <div className='details'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae placeat, nostrum accusamus,
                        esse eveniet corrupti illum at nesciunt laboriosam corporis ipsum exercitationem magni sed
                        aliquid omnis vero sint minus officiis?</p>
                    <h3 className='price'>1900 DH</h3>
                </div>
                <button className=' btn Landing-page-btn'>Add To Cart</button>
            </div>
        </div>
    )
}