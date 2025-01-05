import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { useTranslation } from "react-i18next"; // Import useTranslation for localization
import Login from "../Login/Login";
import Register from "../Register/Register";
import classes from "./landing.module.css";

const Landing = () => {
  const [currentView, setCurrentView] = useState("signIn"); // Default to Sign In
  const navigate = useNavigate(); // Initialize navigate function
  const { t } = useTranslation(); // Translation function

  const switchToSignUp = () => setCurrentView("signUp");
  const switchToSignIn = () => setCurrentView("signIn");

  const handleHowItWorksClick = () => {
    navigate("/how-it-works"); // Redirect to the "how-it-works" route
  };

  return (
    <main className={`container-fluid ${classes.landing}`}>
      <div className="row align-items-center justify-content-center min-vh-100">
        {/* Form Section */}
        <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
          <div className={classes["form-container"]}>
            <div className={classes["form-wrapper"]}>
              {currentView === "signIn" ? (
                <Login switchToSignUp={switchToSignUp} />
              ) : (
                <Register switchToSignIn={switchToSignIn} />
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="col-lg-5 col-md-6 col-sm-12 text-center text-lg-start">
          <div className={classes.info}>
            <h4>{t("landing.about")}</h4>
            <h1>{t("landing.title")}</h1>
            <p>{t("landing.description1")}</p>
            <p>{t("landing.description2")}</p>
            <button onClick={handleHowItWorksClick}>
              {t("landing.howItWorksButton")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;

