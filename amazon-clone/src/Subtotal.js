import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { addBasketItems } from './reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
    const navigate = useNavigate();
    const [{basket}, dispatch] = useStateValue();
    // const addProductPrice = (basket)=>{
    //     let sum=0;
    //     for(let i=0; i<basket.length; i++){
    //         sum+=basket[i].price
    //     }
    //     return sum;
    // }  not a good practice instead use selectors from reducers
    return (
        <div className='subtotal'>
            <CurrencyFormat
            renderText={(value) => (
                    <>
                        <p>
                            Subtotal ( {basket?.length} items):
                            <strong> {value} </strong>
                        </p>
                        <small className='subtotal__gift'>
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
            )}
                decimalScale={2}
                value={addBasketItems(basket)} //homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={()=> navigate("/payment")}>Proceed to checkout</button>
            
        </div>
    );
}

export default Subtotal;