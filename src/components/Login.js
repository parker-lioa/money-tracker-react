import React, {useState} from "react";
import {Link} from "react-router-dom";
const Login = ()=>{
    
    const [email,setEmail]= useState("");
    const [name,setName]= useState("");


    const handleEmailOnchange = (event)=>{
      setEmail(event.target.value);
    };

    const handleNameOnchange = (event)=>{
        setName(event.target.value);
    };

    return(
        <form>
            <label>Email:</label>
            <br/>
            <input type="text" value={email} onChange={handleEmailOnchange}/>
            <br/>
            <label>Name:</label>
            <br/>
            <input type="text" value={name} onChange={handleNameOnchange}/>
            <br/>
            <Link onClick={e => (!email || !name) ? e.preventDefault() : null} to={`app/?Email=${email}&Name=${name}`}><button>Login</button></Link>
        </form>
    );
}

export default Login;