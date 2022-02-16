import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';

function Subtotal() {
    const [{basket}, dispatch] = useStateValue();
    const addProductPrice = (basket)=>{
        let sum=0;
        for(let i=0; i<basket.length; i++){
            sum+=basket[i].price
        }
        return sum;
    }
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
                value={addProductPrice(basket)} //homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button>Proceed to checkout</button>
            
        </div>
    );
}

export default Subtotal;