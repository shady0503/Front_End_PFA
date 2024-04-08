import './updateUser.css'

export default function UpdateUser(props) {
    return (
        <div className="add">
            <div className="modall">
                <span className="close" onClick={() => props.setOpen(false)}>
                    X
                </span>
                <h1>Update</h1>
                <form>
                    {Object.entries(props.columns)
                        .map(([key, value]) => (
                            <div key={key} className="item">
                                <label>{key}</label>
                                <input type={typeof(value)} placeholder={value} />
                            </div>
                        ))}
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};
