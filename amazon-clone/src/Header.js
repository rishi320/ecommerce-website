import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import "./Header.css";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const handleAuthentication = ()=>{
        if(user){
            auth.signOut()
        }
    }
    return (<div className='header'>
        <Link to="/">
            <img className='header__logo' src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' />
        </Link>


        <div className='header__search'>
            <input className='header__searchInput' type='text' />
            <SearchIcon className='header__searchIcon' />
            {/* search logo */}
        </div>
        <div className="header__nav">
            <Link to={!user && "/login"}>
                <div className="header__navOption" onClick={handleAuthentication}>
                    <span className="header__optionLine1">Hello {user ? user?.email : "Guest"} </span>
                    <span className="header__optionLine2">{user ? 'Sign Out' : 'Sign In'}</span>
                </div>
            </Link>
            <div className="header__navOption">
                <span className="header__optionLine1">Returns</span>
                <span className="header__optionLine2">& Orders</span>
            </div>
            <div className="header__navOption">
                <span className="header__optionLine1">Your</span>
                <span className="header__optionLine2">Prime</span>
            </div>
            <Link to="/checkout">
                <div className="header__navOptionBasket">
                    <ShoppingBagIcon />
                    <span className='header__optionLine2 header__basketCount'>{basket?.length}</span>
                </div>
            </Link>

        </div>
    </div>);
}

export default Header;
