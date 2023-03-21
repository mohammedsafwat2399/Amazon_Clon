import React , {useState} from 'react';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/login-logo.png';
import {createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../../firebase';
   

const Login = () => {
    const navigate = useNavigate(); 
       const [email , setEmeil] = useState("");
    const [password , setPassword] = useState("");
    const singIn =(e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth , email , password).then((auth)=>{
            if(auth){
                navigate("/")
            }
        }) 
    };
    const register =(e) =>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth , email , password).then((auth)=>{
            if(auth){
                navigate("/")
            }
        }).catch((error)=>{
            alert(error.message)
        })
    };
    return (
    <div className='login'>
        <Link to="/">
            <img src={Logo} alt  className='login-logo'/>
        </Link>
        <div className='login-container'>
            <h1>Sing in</h1>
            <form>
                <h5>Email</h5>
                <input type="email" value={email} onChange={(e) => setEmeil(e.target.value)} />
                <h5>Password</h5>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className='login-signInBtn ' type='submit' onClick={singIn}>
                    Sing in
                </button>
                <p>
                    By continuing, you agree to Amazons Fake Clone conditions of Use and privacy Notice.
                </p>
                <button className='login-registerBtn' onClick={register}>Create Your Amazon Account</button>
            </form>

        </div>
    </div>
  )
}

export default Login