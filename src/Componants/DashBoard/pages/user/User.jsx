import { singleUser } from "../../../../data"
import Single from "../../maincomponants/Single/Single"
import "./user.css"

const User = () => {

    //Fetch data and send to Single Component

    return (
        <div className="user">
            <Single {...singleUser} />
        </div>
    )
}

export default User