import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Payment.css";
import ShoppingBasket from './ShoppingBasket';
import { useStateValue } from './StateProvider';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { addBasketItems } from './reducer';
import { useEffect } from 'react';
import axios from 'axios';

function Payment() {
    const [{basket,user}, dispatch] = useStateValue();
    const [disabled, setDisabled]= useState(true);
    const [error, setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing]= useState("");
    const [clientSecret, setClientSecret] = useState(true);

    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();

    useEffect(()=>{
        //allows us to inform  stripe regrding the payment and get client secret whenever the basket is changed

        const getClientSecret = async ()=>{
            const response = await axios({
                method:'post',
                url: `/payments/create?total=${addBasketItems(basket)*100}`
            })

            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    },[basket])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            navigate("/orders");
        })

    }

    const handleChange = e =>{
        //listen for changes and display any error
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

  return (
    <div className='payment'>
        <div className="payment__container">
            <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>Green glen layout</p>
                    <p>Bangalore, India</p>
                </div>
            </div>
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment__items">
                    {basket.map(item =>(
                        <ShoppingBasket id={item.id} title={item.title} price={item.price} image={item.image} rating={item.rating}/>
                    ))}
                </div>
            </div>
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange}/>
                    <div className="payment__priceContainer">
                        <CurrencyFormat
                            renderText={(val)=>(
                                <>
                                    <h3>Order Total: {val}</h3>
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