import React, { useContext, useState } from "react";
import "./header.css";
import headerLogo from "../../assets/images/EvangadiLogo.png";
import { AppState } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";

function Header() {
  const token = localStorage.getItem("token");
  const { t, i18n } = useTranslation();

  let [smallScreenLogout, setSmallScreenLogout] = useState(false);

  let navigate = useNavigate();
  let { user, setUser } = useContext(AppState);

  function logoutHandler() {
    localStorage.setItem("token", "");
    setUser("");
    navigate("/");
    window.location.reload();
  }

  // hamMenuHandler function: called when the hamburger menu (on small screens) is clicked
  function hamMenuHandler() {
    if (user) setSmallScreenLogout(!smallScreenLogout); // Toggle the visibility of the logout button on small screens
  }

  function signinHandler() {
    window.location.reload();
  }

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="py-3 shadow-lg position-sticky w-100 "
        style={{
          zIndex: "99",
          top: "0",
        }}
      >
        <Container>
          <Navbar.Brand href="/home">
            <img src={headerLogo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-lg`}
          ></Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 ">
                {token && (
                  <Nav.Item>
                    <Nav.Link as={Link} to="/home">
                      {t("nav.home")}
                    </Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <Nav.Link as={Link} to="/how-it-works">
                    {t("nav.howItWorks")}
                  </Nav.Link>
                </Nav.Item>

                {token && (
                  <h6
                    style={{
                      cursor: "pointer",
                    }}
                    className="fw-bold py-2 px-3 c-pointer"
                    onClick={logoutHandler}
                  >
                    {t("nav.signOut")}
                  </h6>
                )}
              </Nav>

              {/* Sign in button */}
              {!token && (
                <Nav.Item>
                  <Link to={"/"}>
                    <Button
                      onClick={signinHandler}
                      className="px-5"
                      variant="primary"
                    >
                      {t("nav.signIn")}
                    </Button>
                  </Link>
                </Nav.Item>
              )}

              {/* Language switcher */}
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="language-menu">
                  🌐 {t("nav.language")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => changeLanguage("en")}>
                    {t("languages.english")}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("am")}>
                    {t("languages.amharic")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

