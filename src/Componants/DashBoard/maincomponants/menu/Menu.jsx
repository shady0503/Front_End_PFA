import './menu.css'
import { Link } from 'react-router-dom'
import { menu } from "../../../../data"

export default function Menu() {
    return (
        <div className="menu">
            {menu.map(item => (
                <div className="menuItem" key={item.id}>
                    <span className="menuTitle">{item.title}</span>
                    {item.listItems.map(listItem => {
                        const isExternal = listItem.url.startsWith("http");
                        return isExternal ? (
                            <Link to={'/Front_End_PFA/'} className='listItem' key={listItem.id}>
                                <img src={"/Front_End_PFA/" + listItem.icon} alt="" />
                                <span className="listItemTitle">{listItem.title}</span>
                            </Link>
                        ) : (
                            <Link to={`/Front_End_PFA/Dashboard/${listItem.title}`} className='listItem' key={listItem.id}>
                                <img src={"/Front_End_PFA/" + listItem.icon} alt="" />
                                <span className="listItemTitle">{listItem.title}</span>
                            </Link>
                        );
                    })}
                </div>
            ))}
        </div>

    )
}