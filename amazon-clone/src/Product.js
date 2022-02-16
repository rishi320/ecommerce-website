import { ratingClasses } from '@mui/material';
import React from 'react';
import "./Product.css";
import { useStateValue } from './StateProvider';



function Product({ id, title, price, image, rating }) {

  const [state, dispatch] = useStateValue();
  console.log("this is the basket", state.basket);
  
  const addToBasket = ()=>{
    dispatch({
      type:"ADD_TO_BASKET",
      item: {
        id:id,
        title:title,
        image:image,
        price:price,
        rating:rating,
      },
    });
  };
  return (
  <div className='product'>
    <div className="product__info">
      <p>{title}</p>
      <p className="product__price">
        <small>$</small>
        <strong>{price}</strong>
      </p>
      <div className="product__rating">
        {Array(rating).fill().map((item, index) => (
          <p style={{ color: "#f5bd1f" }}>&#x2605;</p>
        ))}
      </div>
    </div>
    <img src={image} alt="" />
    <button onClick={addToBasket}>Add to Basket</button>
  </div>);
}

export default Product;
