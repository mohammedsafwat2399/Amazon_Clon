import {React, useEffect , useState} from 'react'
import "./Payment.css"
import { useAuth } from "../../contecxt/GlobalState";
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from '../checkoutProduct/CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from "../../contecxt/AppReducer"
import axios from '../axios';
import {doc, setDoc} from "firebase/firestore"
import {db} from "../../firebase"
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';



export const Payment = () => {
    const navigate = useNavigate()
    // use confirmation
    const stripe = useStripe();
    // master card
    const elements = useElements();

    const {basket , user , dispatch} = useAuth();
    const [clientSecret, setClientSecret]=useState();
    const [error, setError]=useState(null);
    const [disabled, setDisabled]=useState(true);
    const [succeeded, setSucceeded]=useState(false);
    const [processing, setProcessing]=useState("");
     
    useEffect(()=>{
        const getClientSecret = async()=> {
            const response = await axios({
                method:"post",
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`,
            })
            setClientSecret(response.data.clientSecret);
            return response;
        };
        getClientSecret();

      

    },[basket])
    const handleSubmit= async(e) => {
        e.preventDefault();
        setProcessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card:elements.getElement(CardElement),
            },
        }).then(({ paymentIntent }) => {
            const ref= doc(db,"users", user?.uid, "orders",paymentIntent.id)
            setDoc(ref,{
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created,
            })
             setSucceeded(true);
            setError(null);
            setProcessing(false);
            navigate("/orders", {replace:true})
            dispatch({
                type:"EMPTY_BASKET",
            })

        })
            }
    const handleChange=(e)=>{
        setDisabled(e.empty );
        setError(error ? error.message : '')
    }

  return (
    <div className='payment'>
        <div className='payment-container '>
            <h1>
                checkout (<Link to="/checkout">{basket.length} items</Link>)
            </h1>
            <div className='payment-section'>
                <div class-Name='payment-title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment-address'>
                    <p>{user?.email}</p>
                    <p>Egypt</p>
                </div>
            </div>
            <div className='payment-section'>
                <div className='payment-title'>
                <h3>Review items and delivery  </h3>
                </div>
                <div className='payment-items'>
                    {
                        basket.map((item)=>(
                            <CheckoutProduct  key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            rating={item.rating}/>
                        ))
                    }
                </div>
                 
            </div>

            <div>
                <div className='payment-section '>
                    <h3>Payment Method</h3>
                
                <div className='payment-details '>
                    <form onSubmit={handleSubmit}>
                        <div className='payment-priceContainer'>
                            <CardElement  onChange={handleChange}/>
                        <CurrencyFormat
        renderText={(value)=>(
          <h3>Order Tota : {value}</h3>
        )}
        decimalScale={2}
         displayType={"text"}
         value={getBasketTotal(basket)}
        thousandSeparator={true}
        prefix={"$"}
        />
        <button disabled={disabled || processing || succeeded}>
            <span>{processing? <p>processing</p>: "Buy Now"}</span>
        </button>
                        </div>
                        {error && <div>{error }</div>}
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}
