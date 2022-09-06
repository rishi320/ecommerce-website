import React from 'react';
import "./Order.css";
import moment from 'moment';
import ShoppingBasket from './ShoppingBasket';
import CurrencyFormat from 'react-currency-format';

function Order({order}) {
  return (
    <div className='order'>
       <h3>Order</h3>
       <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
       <p className='order_id'>
<smal>{order.id}</smal>
       </p>
       {order.data.basket?.map((item)=>(
           <ShoppingBasket id={item.id} title={item.title} price={item.price} image={item.image} rating={item.rating} hideButton={true}/>
       ))}
       <div className="order_total">
       <CurrencyFormat
                                    renderText={(val) => (
                                        <>
                                            <h3>Order Total: {val}</h3>
                                        </>
                                    )}

                                    decimalScale={2}
                                    value={order.data.amount /100}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
       </div>
       
    </div>
  )
}

export default Order