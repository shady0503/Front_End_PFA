import './navbar.css'



export default function Navbar() {
    return (
        <div className="adminnavbar">
            <div className="logoadmin">
                <img src="/Front_End_PFA/logo.svg" alt="" />
                <span>ImAdmin</span>
            </div>
            <div className="icons">
                <img src="/Front_End_PFA/search.svg" alt="" className="iconadmin" />
                <img src="/Front_End_PFA/app.svg" alt="" className="iconadmin" />
                <img src="/Front_End_PFA/expand.svg" alt="" className="iconadmin" />
                <div className="notification">
                    <img src="/Front_End_PFA/notifications.svg" alt="" />
                    <span>1</span>
                </div>
                <div className="user">
                    <img src="/Front_End_PFA/pp.jpeg" alt="" />
                    <span>Chadi</span>
                </div>
                <img src="/Front_End_PFA/settings.svg" alt="" className="iconadmin" />
            </div>


        </div>
    )
}