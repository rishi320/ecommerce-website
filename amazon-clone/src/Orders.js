import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import Order from './Order';
import "./Orders.css";
import { useStateValue } from './StateProvider';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {

    if (user) {
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snap => {
          setOrders(snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          })
          ))

        })
     console.log('1234')
    } else {
      setOrders([])
      
    }

  }, [user])

  console.log("orders", orders)

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders?.map((order)=>(
          <Order order={order}/>
        ))}
      </div>
    </div>
  )
}

export default Orders