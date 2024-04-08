import './add.css'

export default function Add(props) {
    return (
        <div className="add">
            <div className="modall">
                <span className="close" onClick={() => props.setOpen(false)}>
                    X
                </span>
                <h1>Add new {props.slug}</h1>
                <form>
                    {props.columns
                        .filter((item) => item.field !== "id" && item.field !== "img")
                        .map((column) => (
                            <div key={column.field} className="item">
                                <label>{column.headerName}</label>
                                <input type={column.type} placeholder={column.field} />
                            </div>
                        ))}
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};
