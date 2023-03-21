import React from "react";
import iconStar from "../../images/icons/star.png";
import "./Product.css"
import { useAuth } from "../../contecxt/GlobalState";

const Product = ({id , image , price , title , rating}) => {
  const {dispatch , basket } = useAuth()
  const appToBasket = (e)=>{
    e.preventDefault();
    dispatch({
      type:"APP_TO_BASKET",
      item:{
        id:id,
        image:image,
        price:price,
        title:title,
        rating:rating
      }
    })
  }
   return (
    <div className="product" key={id}>
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <div className="product-rating">
        {
            Array(rating).fill().map((_,i)=>(
                <p key={i}>
                <img src={iconStar} />
             </p>
            ))
        }
       
      </div>
      <img src={image}  alt="product-img"/>
      <button onClick={appToBasket}>Add To Basket </button>
    </div>
  );
};

export default Product;
