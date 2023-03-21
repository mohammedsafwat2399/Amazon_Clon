import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from 'react-currency-format'
import { useAuth } from "../../contecxt/GlobalState";
import {getBasketTotal} from "../../contecxt/AppReducer"
import { useNavigate } from 'react-router-dom';

 const Subtotal = () => {
    const {basket} = useAuth()
    const navigate = useNavigate()
   return (
    <div className='subtotal'>
        <CurrencyFormat
        renderText={(value)=>(
            <>
            <p>
                Subtotal ({basket.length} item) : <strong>{value}</strong>
            </p>
            </>
        )}
        decimalScale={2}
         displayType={"text"}
         value={getBasketTotal(basket)}
        thousandSeparator={true}
        prefix={"$"}
        />
        <small className='subtotal_gift'>
            <input type="checkbox"/>This order contains a gift
        </small>
        <button onClick={()=> navigate("/payment")} >Proceed to Checkout </button>
    </div>
  )
}

export default Subtotal