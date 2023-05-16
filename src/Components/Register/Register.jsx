import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { authProvider } from "../../AuthProvider/AuthProvider";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Register = () => {
  const { createUser, googleSignIn } = useContext(authProvider);
  const [showPass, setShowPass] = useState(true);

  const [error, setError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      setError("password not matched");
      return;
    } else if (password.length < 6) {
      setError("password must be 6 characters");
      
      return;
    }
    createUser(email, password)
      .then((result) => {
        const currentUser = result.user;
        toast.success("welcome to, ema-jhon")
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "bottom-center"
        })
      });
  };

  // sign in with google
  const handleWithGooglSign = () => {
    googleSignIn()
      .then((res) => {
        const currentUser = res.user;
        toast.success("welcome to, ema-jhon")
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "bottom-center"
        })
      });
  };
  const handleShowPass = (e) => {
    if (e.type === "click") {
      setShowPass(!showPass);
    }
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input required type="email" name="email" id="" />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input required type={showPass ? `password` : "text"} name="password" id="" />
          <button
            type="button"
            onClick={handleShowPass}
            className="pass-hide-toggle"
          >
            {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
        </div>
        <div className="form-control">
          <label htmlFor="">Confirm Password</label>
          <input required type={showPass ? `password` : "text"} name="confirmPassword" id="" />
          <button
            type="button"
            onClick={handleShowPass}
            className="pass-hide-toggle"
          >
            {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
        </div>
        <div className="form-button">
          <button className="submit-Btn">Sign Up</button>
        </div>
      </form>
      <p className="user-toggle">
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </p>

      <p className="text-error">{error}</p>

      <div className="or-line">
        <div></div>
        <p>or</p>
        <div></div>
      </div>
      <div className="social-login">
        <button onClick={handleWithGooglSign} className="google-Login">
          <FcGoogle className="googleIcon"></FcGoogle>{" "}
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
