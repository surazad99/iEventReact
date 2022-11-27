import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""})
  const host = process.env.REACT_APP_API_HOST;
  const navigate = useNavigate();
  const handleSubmit = async (event)=> {
    event.preventDefault();
    //Login using Api
    const response = await fetch(`${host}/api/login`, {
      method: "POST",
      headers: {
      "Content-type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
  });
  const apiResponse = await response.json();
  if(response.status === 200){
    localStorage.setItem('token', 'Bearer '+apiResponse.data.access_token);
    props.showAlert('success', apiResponse.message);
    navigate("/");
  }else if(response.status === 422){
    props.showAlert('danger', apiResponse.errors[0].msg);
  }else{
    props.showAlert('danger', apiResponse.message);
  }
};

  const handleOnchange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value});
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className="my-3" >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={handleOnchange}  aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={handleOnchange} name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login
