import './navbar.css'



export default function Navbar() {
    return (
        <div className="adminnavbar">
            <div className="logoadmin">
                <img src="logo.svg" alt="" />
                <span>ImAdmin</span>
            </div>
            <div className="icons">
                <img src="/search.svg" alt="" className="iconadmin" />
                <img src="/app.svg" alt="" className="iconadmin" />
                <img src="/expand.svg" alt="" className="iconadmin" />
                <div className="notification">
                    <img src="/notifications.svg" alt="" />
                    <span>1</span>
                </div>
                <div className="user">
                    <img src="/pp.jpeg" alt="" />
                    <span>Chadi</span>
                </div>
                <img src="/settings.svg" alt="" className="iconadmin" />
            </div>


        </div>
    )
}