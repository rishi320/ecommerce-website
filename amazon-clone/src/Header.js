import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import "./Header.css";

function Header() {
  return (<div className='header'>
      <img className='header__logo' src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'/>

      <div className='header__search'>
          <input className='header__searchInput' type='text'/>
          <SearchIcon className='header__searchIcon'/>
          {/* search logo */}
      </div>
      <div className="header__nav">
          <div className="header__navOption">
              <span className="header__optionLine1">Hello Guest</span>
              <span className="header__optionLine2">Sign In</span>
          </div>
          <div className="header__navOption">
              <span className="header__optionLine1">Returns</span>
              <span className="header__optionLine2">& Orders</span>
          </div>
          <div className="header__navOption">
              <span className="header__optionLine1">Your</span>
              <span className="header__optionLine2">Prime</span>
          </div>
          <div className="header__navOptionBasket">
              <ShoppingBagIcon/>
              <span className='header__optionLine2 header__basketCount'>0</span>
          </div>
      </div>
  </div>);
}

export default Header;
