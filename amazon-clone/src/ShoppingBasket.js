import React from 'react';
import "./ShoppingBasket.css";

function ShoppingBasket({ id, title, price, image, rating }) {
    return (
        <div className='shoppingbasket'>
            <div className="shoppingbasket__img">
                <img src={image} alt="" />
            </div>
            <div className="shoppingbasket__info">
                <p>{title}</p>
                <p className="shoppingbasket__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="shoppingbasket__rating">
                    {Array(rating).fill().map((item, index) => (
                        <p style={{ color: "#f5bd1f" }}>&#x2605;</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShoppingBasket;