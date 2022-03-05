import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from "./Home";
import Checkout from './Checkout';
import Login from './Login';
import './App.css';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      console.log("the user is >>", authUser);

      if(authUser){
         //the user just logged in/ the user was logged in
         dispatch({
           type: "SET_USER",
           user: authUser
         })
      } else{
           //the user logged out
           dispatch({
             type:"SET_USER",
             user: null
           })
      }
    })
  },[])
  return (
    <div className="app">

      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<>
          <Header />
          <Home />
        </>
        } />
        <Route path="/checkout" element={<>
          <Header />
          <Checkout />
        </>} />
      </Routes>


    </div>
  );
}

export default App;
