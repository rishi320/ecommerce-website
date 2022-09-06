import React, { useState } from 'react';
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';
import "./Payment.css";
import ShoppingBasket from './ShoppingBasket';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { addBasketItems } from './reducer';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = e =>{

    }
     
    const handleChange = e =>{
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>Checkout (<Link to="/checkout">{basket?.length} items </Link>)</h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery</h3></div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>HB Colony</p>
                        <p>Armoor, Telangana</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items</h3></div>
                    <div className="payment__items">
                        {basket.map((item, index) => (
                            <ShoppingBasket
                                id={item.id} title={item.title} price={item.price} image={item.image} rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment method</h3></div>
                    <div className="payment__details">
                        {/* Stripe payments */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value)=>(
                                    <>
                                    <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={addBasketItems(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment