import React, { useState } from "react";
import axios from "axios";
import './Style.css'

const LoginPage = ({ setisConect }) => {
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cin || !password) {
      setError("Please fill in both CIN and password.");
      return;
    }

    try {
      const response = await axios.post("https://notes.devlop.tech/api/login", {
        cin,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("authToken", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setisConect(true);
    } catch (err) {
      console.error(err);
      setError("Invalid CIN or password. Please try again.");
    }
  };


  return (
    <div className="Login-page">
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="login">Welcome To Notes-App</h1>
        <p className="breif">Please enter your CIN and password to login</p>
        <div className="cin-form">
          <label className="title-input" htmlFor="cin">CIN</label>
          <input
            placeholder="Enter Your CIN !!"
            className="input"
            type="text"
            id="cin"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="Button" >Login</button>
        <a className="lien" href="#">Forgot Your Password ?</a>
      </form>
    </div>
  );
};

export default LoginPage;
