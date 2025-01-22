import React, { useState } from "react";
import axios from "axios";
import './Style/Style.css';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const LoginPage = ({ setisConect }) => {
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState("idle");

  const navigate = useNavigate();

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(true);

    if (!cin || !password) {
      setError("Please fill in both CIN and password.");
      return;
    }

    try {
      setLoading("pending");
      const response = await axios.post("https://notes.devlop.tech/api/login", {
        cin,
        password,
      });
      localStorage.setItem("first", response.data.user.first_name);
      localStorage.setItem("last", response.data.user.last_name);

      const token = response.data.token;
      localStorage.setItem("authToken", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setLoading("fulfilled");
      setisConect(true);
      navigate('/home');

    } catch (err) {
      console.error(err);
      setLoading("rejected");
      setError("Invalid CIN or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form-container">
        <h1 className="login-title">Welcome To Notes-App</h1>
        <p className="login-breif">Please enter your CIN and password to login</p>
        <div className="login-cin-form">
          <label className="login-title-input" htmlFor="cin">CIN</label>
          <input
            placeholder="Enter Your CIN !!"
            className="login-input"
            type="text"
            id="cin"
            value={cin}
            onChange={(e) => { setShowError(false); setCin(e.target.value); }}
          />
        </div>
        <div className="login-password-form">
          <label htmlFor="password" className="login-title-input">Password</label>
          <input
            placeholder="Enter Your Password !!"
            className="login-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => { setShowError(false); setPassword(e.target.value); }}
          />
        </div>
        {showError && loading === "rejected" &&
          <Alert severity="error">{error}</Alert>
        }
        {loading === "pending" && <CircularProgress className="login-progress" />}
        <button type="submit" className="login-button">Login</button>
        <Link className="login-lien" onClick={handleClick}>Forgot Your Password?</Link>
        {showAlert && (
          <Alert severity="warning" onClose={() => setShowAlert(false)}>
            Please Contact <strong>Mr.Taha Ferhani</strong> for reset your password!
          </Alert>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
