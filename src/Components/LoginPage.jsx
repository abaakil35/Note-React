import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cin">CIN</label>
          <br />
          <input
            type="text"
            id="cin"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" >Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
