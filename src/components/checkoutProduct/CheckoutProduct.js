import React from 'react'
import "./CheckoutProduct.css"
import iconStar from "../../images/icons/star.png";
import {useAuth} from "../../contecxt/GlobalState"


const CheckoutProduct = ( {id,
    title,
    price,
    image,
    rating,
    hiddenButton
    }) => {
      const {dispatch} =useAuth();
      const removeFromBasket=()=>{
        dispatch({
          type:"REMOVE_FROM_BASKET",
          id:id
        })
      }
  return (
    <div className='checkoutProduct'>
         <img  className='checkoutProduct-image' src={image}/>
         <div className='checkoutProduct-info '>
            <p className='checkoutProduct-title'>{title}</p>
            <p>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='checkoutProduct-rating'>
            {
            Array(rating).fill().map((_,i)=>(
                <p key={i}>
                <img src={iconStar} />
             </p>
            ))
        }
            </div>
            {!hiddenButton&&(
            <button onClick={removeFromBasket} >Remove from Basket</button>
   ) }
         </div>
         
    </div>
  )
}

export default CheckoutProduct