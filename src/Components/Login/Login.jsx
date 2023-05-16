import React from "react";
import "./login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash, FaEye, FaFacebook } from "react-icons/fa";
import { useContext } from "react";
import { authProvider } from "../../AuthProvider/AuthProvider";
import { useState } from "react";
import { useRef } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const { login, googleSignIn, loader, forgetPassword, facebookSignIn } =
    useContext(authProvider);
  const useEmail = useRef(null);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((result) => {
        const currentUser = result.user;
        toast.success("welcome to, ema-jhon");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "bottom-center",
        });
      });
  };

  const handleLogIn = () => {
    googleSignIn()
      .then((res) => {
        const currentUser = res.user;
        toast.success("welcome to, ema-jhon");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "bottom-center",
        });
        // setError(err.message)
      });
  };

  // reset password
  const handleForgetPass = () => {
    const email = useEmail.current.value;
    if (!email) {
      toast("please enter your mail");
      return;
    } else {
      forgetPassword(email)
        .then(() => {
          toast.success("Please check your mail box");
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "bottom-center",
          });
        });
    }
  };

  // show pass toggle
  const handleShowPass = (e) => {
    if (e.type === "click") {
      setShowPass(!showPass);
    }
  };

  const handleSIgnInFacebook = () => {
    facebookSignIn()
      .then((res) => {
        const currentUser = res.user;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input ref={useEmail} required type="email" name="email" id="" />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input
            required
            type={showPass ? `password` : "text"}
            name="password"
            id=""
          />
          <button
            type="button"
            onClick={handleShowPass}
            className="pass-hide-toggle"
          >
            {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
        </div>
        <p className="forgot-pass">
          <span onClick={handleForgetPass}>Forgot Password?</span>
        </p>
        <div className="form-button">
          <button type="submit" className="submit-Btn">
            Login
          </button>
        </div>
      </form>
      <p className="user-toggle">
        <small>
          New to Ema-john? <Link to="/signup">Create New Account</Link>
        </small>
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
        <button onClick={handleSIgnInFacebook} className="google-Login">
          <FaFacebook className="googleIcon"></FaFacebook>{" "}
          <span>Continue with Facebook</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
