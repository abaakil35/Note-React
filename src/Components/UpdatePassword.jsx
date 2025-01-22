import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import './Style/UpdatePassword.css'
import Alert from '@mui/material/Alert';


const User = () => {
  const [old, setold] = useState("");
  const [newp, setnewp] = useState("");
  const [conf, setconf] = useState("");
  const myToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handlePassword = () => {
    if (old && newp && conf) {
      if (old && newp && conf && newp === conf) {
        axios
          .put(
            `https://notes.devlop.tech/api/update-password`,
            {
              current_password: old,
              new_password: newp,
              new_password_confirmation: conf,
            },
            {
              headers: {
                Authorization: `Bearer ${myToken}`,
              },
            }
          )
          .then(() => {
            
            navigate("/home");
          });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="update-password-container">
      <h1 className="update-password-title">Change Password</h1>
      <form onClick={handleSubmit} className="update-password-form">
        <div>
          <label>New Password :</label>
          <input
            type="password"
            className="change"
            onChange={(e) => setnewp(e.target.value)}
            placeholder="New Password"
          />
        </div>
        <div>
          <label>Confirm Password :</label>
          <input
            type="password"
            className="change"
            onChange={(e) => setconf(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="Change"
          onClick={handlePassword}
        >
          Change Password
        </motion.button>
      </form>
      <br />
      <Alert severity="warning">
                  If you Have Probleme Please Contact  <strong>Mr.Taha Ferhani</strong> for reset your password  !!!!!
                </Alert>
    </div>
  );
};

export default User;
