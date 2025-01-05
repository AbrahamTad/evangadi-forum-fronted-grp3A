import React, { useRef, useState } from "react";
// import axios from "../../Api/axiosConfig";
import classes from "./pwChange.module.css";
import { Link } from "react-router-dom";


const PwChange = ({ switchToLogin, switchToRegister }) => {
  //   const emailDom = useRef();
  //   const [message, setMessage] = useState("");
  //   const [messageType, setMessageType] = useState(""); // success or error message

  //   async function handleResetPassword(e) {
  //     e.preventDefault();
  //     const emailValue = emailDom.current.value;

  //     if (!emailValue) {
  //       setMessage("Please provide an email address");
  //       setMessageType("error");
  //       return;
  //     }

  //     try {
  //       const { data } = await axios.post("/users/reset-password", {
  //         email: emailValue,
  //       });

  //       setMessage(data.msg || "Password reset link has been sent to your email");
  //       setMessageType("success");
  //     } catch (error) {
  //       const errorMessage =
  //         error?.response?.data?.msg ||
  //         "Failed to send reset link. Please try again.";
  //       setMessage(errorMessage);
  //       setMessageType("error");
  //     }
  //   }

  return (
    <section className={classes["container"]}>
      <div className={classes["form"]}>
        <h2>Reset Your Password</h2>

        <p>
          Fill in your e-mail address below and we will send you an email with
          further instructions
        </p>

        {/* {message && (
        <p
          style={{
            color: messageType === "error" ? "red" : "green",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )} */}

        <form>
          <input
            //   ref={emailDom}
            type="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        <h6 onClick={switchToLogin}>Already have an account?</h6>
        <h6 onClick={switchToRegister}>Don't have an account?</h6>
      </div>
    </section>
  );
};

export default PwChange;
