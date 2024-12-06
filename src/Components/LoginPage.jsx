import React, { useState, } from "react";
import axios from "axios";
import './Style/Style.css'
import Alert from '@mui/material/Alert';
import CircularProgress from "@mui/material/CircularProgress";

const LoginPage = ({ setisConect }) => {
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState("idle");
  


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
      // console.log(response.data);

      const token = response.data.token;
      localStorage.setItem("authToken", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setLoading("fulfield")
      setisConect(true);
    } catch (err) {
      console.error(err);
      setLoading("rejected")
      setError("Invalid CIN or password. Please try again.");
    }
  };
 


  return (
    <div className="Login-page">
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="login">Welcome To Notes-App
        </h1>
        <p className="breif">Please enter your CIN and password to login </p>
        <div className="cin-form">
          <label className="title-input" htmlFor="cin">CIN</label>
          <input
            placeholder="Enter Your CIN !!"
            className="input"
            type="text"
            id="cin"
            value={cin}
            onChange={(e) => {setShowError(false); setCin(e.target.value)}}
            
          />
        </div>
        
        <div className="Passworn-form">
          <label htmlFor="password" className="title-input">Password</label>
          
          <input
            placeholder="Enter Your Password !!"
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {setShowError(false); setPassword(e.target.value)}}
            
          />
        </div>
        {showError && loading == "rejected"  &&
          <Alert severity="error" >{error}</Alert>
        }
        {loading == "pending" && <CircularProgress className="progress" />}
        <button type="submit" className="Button" >Login</button>
        <a className="lien" onClick={handleClick}>Forgot Your Password ?</a>
        
        {showAlert && (
        <Alert severity="warning" onClose={() => setShowAlert(false)}>
          Please Contact <strong>Mr.Taha Ferhani</strong>  for reset your password !
        </Alert>
      )}
      </form>
    </div>
  );
};

export default LoginPage;
