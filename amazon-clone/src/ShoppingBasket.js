import React from 'react';
import "./ShoppingBasket.css";
import { useStateValue } from './StateProvider';

function ShoppingBasket({ id, title, price, image, rating,hideButton }) {
    const [{ basket }, dispatch] = useStateValue();

    const removeBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        });
    };
    return (
        <div className='shoppingbasket'>

            <img className="shoppingbasket__img" src={image} alt="" />

            <div className="shoppingbasket__info">
                <p className="shoppingbasket__title">{title}</p>
                <p className="shoppingbasket__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="shoppingbasket__rating">
                    {Array(rating).fill().map(() => (
                        <p style={{ color: "#f5bd1f" }}>&#x2605;</p>
                    ))}
                </div>
                {!hideButton && <button onClick={removeBasket}>Remove from basket</button>}
            </div>
        </div>
    )
}

export default ShoppingBasket;