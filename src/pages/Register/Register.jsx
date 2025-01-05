import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../Api/axiosConfig";
import { useNavigate } from "react-router-dom";
import classes from "./register.module.css";

const Register = ({ switchToSignIn }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  // State to store error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [formError, setFormError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    // Clear previous error message
    setErrorMessage("");
    setFormError("");

    // Check if all fields are filled
    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      setFormError(t("register.error"));
      return;
    }

    try {
      // Make POST request to register user
      const response = await axios.post(
        "/users/register",
        {
          username: usernameValue,
          firstname: firstnameValue,
          lastname: lastnameValue,
          email: emailValue,
          password: passwordValue,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );

      // Check for successful response
      if (response.status === 201) {
        navigate("/home"); // Redirect to login after successful registration
      }
    } catch (error) {
      // Log the error for debugging and set error message for UI
      console.error("Error:", error.response || error.message);

      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg); // Display specific error message from the backend
      } else {
        setErrorMessage(t("register.failure")); // Generic error message if no specific message
      }
    }
  }

  return (
    <>
      <div className={classes["form"]} id={classes["sign-up-form"]}>
        <h2>{t("register.joinNetwork")}</h2>
        <p>
          {t("register.alreadyAccount")}
          <span className={classes["toggle-link"]} onClick={switchToSignIn}>
            {t("register.signIn")}
          </span>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            ref={usernameDom}
            type="text"
            placeholder={t("register.placeholders.username")}
            required
          />
          <input
            ref={firstnameDom}
            type="text"
            placeholder={t("register.placeholders.firstname")}
            required
          />
          <input
            ref={lastnameDom}
            type="text"
            placeholder={t("register.placeholders.lastname")}
            required
          />
          <input
            ref={emailDom}
            type="email"
            placeholder={t("register.placeholders.email")}
            required
          />
          <input
            ref={passwordDom}
            type="password"
            placeholder={t("register.placeholders.password")}
            required
          />
          {formError && <div className={classes.errorMessage}>{formError}</div>}
          {errorMessage && (
            <div className={classes.errorMessage}>{errorMessage}</div>
          )}
          <button type="submit">{t("register.submit")}</button>
        </form>
      </div>
    </>
  );
};

export default Register;

//original registration
// import React, { useRef } from "react";
// import axios from "../../Api/axiosConfig";
// import { Link, useNavigate } from "react-router-dom";
// import classes from "./register.module.css";

// const Register = ({ switchToSignIn }) => {
//   const navigate = useNavigate();
//   const usernameDom = useRef();
//   const firstnameDom = useRef();
//   const lastnameDom = useRef();
//   const emailDom = useRef();
//   const passwordDom = useRef();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const usernameValue = usernameDom.current.value;
//     const firstnameValue = firstnameDom.current.value;
//     const lastnameValue = lastnameDom.current.value;
//     const emailValue = emailDom.current.value;
//     const passwordValue = passwordDom.current.value;

//     if (
//       !usernameValue ||
//       !firstnameValue ||
//       !lastnameValue ||
//       !emailValue ||
//       !passwordValue
//     ) {
//       alert("please provide all required informations");
//       return;
//     }

//     try {
//       await axios.post("/users/register", {
//         username: usernameValue,
//         firstname: firstnameValue,
//         lastname: lastnameValue,
//         email: emailValue,
//         password: passwordValue,
//       });
//       alert("register successfull, please login");

//       navigate("/");
//     } catch (error) {
//       alert("something went wrong");
//       console.log(error.response);
//     }
//   }

//   return (
//     <>
//       <div className={classes["form"]} id={classes["sign-up-form"]}>
//         <h2>Join the network</h2>
//         <p>
//           Already have an account?
//           <span className={classes["toggle-link"]} onClick={switchToSignIn}>
//             Sign in
//           </span>
//         </p>
//         <form onSubmit={handleSubmit} action="">
//           <input
//             ref={usernameDom}
//             type="text"
//             placeholder="User name"
//             required
//           />
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <input
//               style={{ width: "45%" }}
//               ref={firstnameDom}
//               type="text"
//               placeholder="First name"
//               required
//             />
//             <input
//               style={{ width: "45%" }}
//               ref={lastnameDom}
//               type="text"
//               placeholder="Last name"
//               required
//             />
//           </div>
//           <input
//             ref={emailDom}
//             type="email"
//             placeholder="Email address"
//             required
//           />
//           <input
//             ref={passwordDom}
//             type="password"
//             placeholder="Password"
//             required
//           />
//           <div
//             style={{
//               display: "block",
//               textAlign: "center",
//               margin: "10px",
//               fontSize: "13px",
//             }}
//           >
//             I agree to the <a href="#">privacy policy</a> and{" "}
//             <a href="#">terms of service</a>.
//           </div>
//           <button type="submit">Agree and Join</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Register;
