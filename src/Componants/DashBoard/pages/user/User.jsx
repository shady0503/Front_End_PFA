import { singleUser } from "../../../../data"
import Single from "../../maincomponants/Single/Single"
import "./user.css"

const User = () => {


    return (
        <div className="user">
            <Single {...singleUser} />
        </div>
    )
}

export default User