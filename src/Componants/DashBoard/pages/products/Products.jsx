import { useState } from 'react';
import { productColumns, products } from '../../../../data';
import DataTable from '../../maincomponants/DataTable/DataTable';
import Add from '../../maincomponants/add/Add';
import './products.css'


export default function Products(){
    const [open, setOpen] = useState(false)
    return (
        <div className="products">
            <div className="info">
                <h1>Products</h1>
                <button onClick={() => {setOpen(true)}}>Add New Products</button>
            </div>
            <DataTable slug="Products" columns={productColumns} rows={products} />
            {open && <Add slug="Product" columns={productColumns} setOpen={setOpen} />}
        </div>
    );
}