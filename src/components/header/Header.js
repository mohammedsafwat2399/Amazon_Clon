import React from 'react';
import "./header.css"
import { Link } from 'react-router-dom';
import Logo from '../../images/header-logo.png';
import searchIcon from '../../images/icons/searchIcon.png';
import shoppingCart from "../../images/icons/shopping-cart.png"
import {useAuth} from "../../contecxt/GlobalState"
import { auth } from '../../firebase';

 
const Header = () => {
    const {user , basket} =useAuth()
    const handleAuthentication=()=>{
        auth.signOut()
    }
    return (
    <div className='header'>
        <Link to="/">
            <img className='header-logo' src={Logo} alt="logo-img"  />
        </Link>
        <div className='header-search'>
            <input className='header-searchInput' type="text"  />
            <img className='header-searchIcon' alt="search-icon" src={searchIcon}/>
        </div>
        <div className='header-nav' >
            <Link to={!user && "/login"}>
                <div className='header-option'onClick={handleAuthentication}>
                    <div className='header-optionLineOne'> Hello {user ? `${user.email}`: 'Guest'}</div>
                    <div className='header-optionLineTow'>{user? "Sing Out" : "Sing In"}</div>
                </div>
                </Link> 
                <Link to="/orders">
                <div className='header-option'>
                    <div className='header-optionLineOne'>Returns</div>
                    <div className='header-optionLineTow'>& Orders</div>
                </div>
                </Link> 
                
                <Link to="/checkout">
                <div className='header-optionBasket'>
                    <img src={shoppingCart}/>
                    <div className='header-optionLineTow header-basketCount'>{basket?.length}</div>
                </div>
                </Link> 
              
            
        </div>
    </div>
  )
}

export default Header