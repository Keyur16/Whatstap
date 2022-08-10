import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const history  = useNavigate();

    const handleSubmit = async (e)=>{

        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            
            headers: {
              'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({email: credentials.email, password: credentials.password}) // body data type must match "Content-Type" header
          });
          const json = await response.json()
          console.log(json);

          if(json.success){
            //Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            history('/');
          }
          else{
            alert("invalid credentials");
          }
    }

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }

  return (
    <div>

      <h2>Please Login to continue ! </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>

</form>

    </div>
  )
}

export default Login
