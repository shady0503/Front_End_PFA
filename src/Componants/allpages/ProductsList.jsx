    import React from 'react';
    import { useContext } from 'react';
    import Articles from './Articles';
    import { DataContext } from '../dataContext';
    function ProductsList(props) {
        const { data } = useContext(DataContext);
    
        if (!data) return null;
    
        const productsList = data[props.slug];
        console.log(props.slug, productsList);
    
        return (
            <div className='container-fluid-Articles'>
                {productsList && productsList.map((item, index) => (
                    <Articles key={item.id} slug={props.slug} item={item} />
                ))}
            </div>
        );
    }
    export default ProductsList;
