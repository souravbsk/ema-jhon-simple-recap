import React from "react";
import "./login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { authProvider } from "../../AuthProvider/AuthProvider";
import { useState } from "react";

const Login = () => {
  const { login,googleSignIn,loader } = useContext(authProvider);
  const [error,setError] = useState("")
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email,password)
    .then(result => {
        const currentUser = result.user;
        console.log(currentUser);
        navigate(from,{replace:true})
    })
    .catch(err => {
        setError(err.message)
    })
  };


  const handleLogIn = () => {
    googleSignIn()
    .then(res => {
        const currentUser = res.user;
        console.log(currentUser);
        navigate(from,{replace:true})
    })
    .catch(err => {
        setError(err.message)
    })
  }
  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input required type="email" name="email" id="" />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input required type="password" name="password" id="" />
        </div>
        <div className="form-button">
          <button className="submit-Btn">Login</button>
        </div>
      </form>
      <p className="user-toggle">
        <small>
          New to Ema-john? <Link to="/signup">Create New Account</Link>
        </small>
      </p>
      <p className="text-error">
        {error}
        </p>

      <div className="or-line">
        <div></div>
        <p>or</p>
        <div></div>
      </div>
      <div className="social-login">
        <button onClick={handleLogIn} className="google-Login">
          <FcGoogle className="googleIcon"></FcGoogle>{" "}
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
