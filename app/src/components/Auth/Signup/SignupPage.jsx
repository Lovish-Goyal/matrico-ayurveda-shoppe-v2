import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import styles from "./SignupPage.module.css";

const SignupPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7080";
      const response = await fetch(
        `${backendUrl}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        alert("Signup successful!");
        setUser({ username: "", email: "", password: "" });
        navigate("/login");
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const error = await response.json();
          alert(error.message || "Registration failed. Please try again.");
        } else {
          const errorText = await response.text();
          alert(errorText || "Registration failed with status " + response.status);
        }
      }
    } catch (err) {
      console.error("Signup failed:", err.message);
      alert("Signup failed: " + err.message);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <div className={styles.inputWithIcon}>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className={styles.input}
              />
              <AiOutlineUser className={styles.icon} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWithIcon}>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className={styles.input}
              />
              <AiOutlineMail className={styles.icon} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWithIcon}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                minLength={8}
                autoComplete="your password"
                className={styles.input}
              />
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className={styles.icon}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <AiOutlineEye
                  className={styles.icon}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
        <p className={styles.signupText}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
