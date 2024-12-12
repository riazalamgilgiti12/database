import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Attempt login with provided email and password
    try {
      const response = await axios.post("http://localhost:3000/api/login", { email, password });
      setToken(response.data.token);
      console.log("JWT Token:", response.data.token);
    } catch (error) {
      console.error("Error logging in", error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <p>Enter your email and password to sign in!</p>

      <div className="hr-with-text">
        <span>or</span>
      </div>

      <label>Email*</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="mail@simmple.com"
        required
      />
      
      <label>Password*</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Min. 8 characters"
        required
      />

      <div className="checkbox-container">
        <div className="checkbox">
          <input type="checkbox" id="keep-logged-in" />
          <label htmlFor="keep-logged-in">Keep me logged in</label>
        </div>
        <a href="#">Forget password?</a>
      </div>

      <button type="submit">Sign In</button>
      
      <p>
        Not registered yet? <a href="#">Create an Account</a>
      </p>

      <div className="footer">
        <p>© 2023 Spark Drive. All Rights Reserved.</p>
      </div>

      {token && <p>Your token: {token}</p>}
    </form>
  );
};

export default LoginForm;
