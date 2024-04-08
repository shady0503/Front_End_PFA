    import React from 'react';
    import { useContext } from 'react';
    import Articles from './Articles';
    import { DataContext } from '../dataContext';
    function ProductsList(props) {
        const { data } = useContext(DataContext)
        const {items, promotionItems, cartItems} = data

        return (
            <div className='container-fluid-Articles'>
                {
                    props.filter ?
                        items.map((item, index) => <Articles key={index} item={item} />)
                        : promotionItems.map((item, index) => <Articles key={index} item={item} />)

                }
            </div>
        );
    }

    export default ProductsList;
