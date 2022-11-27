import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();
  const host = process.env.REACT_APP_API_HOST; 
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleOnsubmit = async (event) => {
    event.preventDefault();
    const {name, email, password, password_confirmation} = credentials;
    //Call Api to create a user
    const response = await fetch(`${host}/api/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
       name, email, password, password_confirmation
      }),
    });
    const apiResponse = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", 'Bearer '+apiResponse.data.access_token);
      console.log(apiResponse);
      props.showAlert('success', apiResponse.message);
      navigate("/");

    }else if(response.status === 422){
      props.showAlert('danger', apiResponse.message);
    }else{
      props.showAlert('danger', apiResponse.message);
    }
  };
  return (
    <div className="container">
      <form className="my-3" onSubmit={handleOnsubmit}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={onChange}
            minLength={5}
            required
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
