import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../Api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classes from "./login.module.css";

const Login = ({ switchToSignUp }) => {
  const { t } = useTranslation(); // Translation function
  const navigate = useNavigate(); // Navigation function
  const emailDom = useRef(); // Reference for email input
  const passwordDom = useRef(); // Reference for password input

  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isPasswordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to toggle ForgotPassword form

  // Handle login form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value.trim();
    const passwordValue = passwordDom.current.value.trim();

    if (!emailValue || !passwordValue) {
      setErrorMessage(t("login.error"));
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      setErrorMessage("");
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      setErrorMessage(t("login.failure"));
      console.error(error?.response?.data?.msg || error.message);
    }
  }

  // Forgot Password Component
  const ForgotPassword = () => {
    const resetEmailRef = useRef(); // Reference for reset email input

    // Handle password reset submission
    async function handleResetSubmit(e) {
      e.preventDefault();
      const resetEmail = resetEmailRef.current.value.trim();

      if (!resetEmail) {
        setErrorMessage(t("forgotPassword.error")); // Error if email is empty
        return;
      }

      try {
        await axios.post("/users/forgot-password", { email: resetEmail });
        setErrorMessage(""); // Clear error message
        alert(t("forgotPassword.success")); // Success message
        setShowForgotPassword(false); // Switch back to login form
      } catch (error) {
        setErrorMessage(t("forgotPassword.failure")); // Failure message
        console.error(error?.response?.data?.msg || error.message);
      }
    }

    return (
      <div className={classes.form}>
        <h2>{t("forgotPassword.heading")}</h2>
        <p>{t("forgotPassword.instructions")}</p>
        <form onSubmit={handleResetSubmit}>
          <input
            ref={resetEmailRef}
            type="email"
            placeholder={t("forgotPassword.placeholders.email")}
            autoComplete="email"
            required
          />
          {errorMessage && (
            <div className={classes.errorMessage}>{errorMessage}</div>
          )}
          <button type="submit">{t("forgotPassword.resetButton")}</button>
          <button
            type="button"
            className={classes.backButton}
            onClick={() => setShowForgotPassword(false)}
          >
            {t("forgotPassword.backToLogin")}
          </button>
        </form>
      </div>
    );
  };

  return showForgotPassword ? (
    <ForgotPassword />
  ) : (
    <div className={classes.form}>
      <h2>{t("login.loginHeading")}</h2>
      <p>
        {t("login.noAccount")}
        <span className={classes["toggle-link"]} onClick={switchToSignUp}>
          {t("login.createAccount")}
        </span>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          ref={emailDom}
          type="email"
          placeholder={t("login.placeholders.email")}
          autoComplete="email"
          required
        />
        <div className={classes.passwordField}>
          <input
            ref={passwordDom}
            type={isPasswordVisible ? "text" : "password"}
            placeholder={t("login.placeholders.password")}
            autoComplete="current-password"
            required
          />
          <span
            className={classes.eyeIcon}
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errorMessage && (
          <div className={classes.errorMessage}>{errorMessage}</div>
        )}
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowForgotPassword(true);
            }}
          >
            {t("login.forgotPassword")}
          </a>
        </div>
        <button type="submit">{t("login.loginButton")}</button>
      </form>
    </div>
  );
};

export default Login;

