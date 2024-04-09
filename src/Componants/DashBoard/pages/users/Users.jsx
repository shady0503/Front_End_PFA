import './Users.css'
import DataTable from '../../maincomponants/DataTable/DataTable'
import { usersColumns, usersRows } from '../../../../data'
import { useState } from 'react'
import Add from '../../maincomponants/add/Add'

export default function Users() {
    const [open, setOpen] = useState(false)
    return (
        <div className="users">
            <div className="info">
                <h1>Users</h1>
                <button onClick={() => {setOpen(true) ; console.log(open)}}>Add New User</button>
            </div>
            <DataTable slug="Users" columns={usersColumns} rows={usersRows} />
            {open && <Add slug="User" columns={usersColumns} setOpen={setOpen} />}
        </div>
    );
};