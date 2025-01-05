import { createContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";

import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./Api/axiosConfig";
import Landing from "./pages/Landing/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import Ask from "./pages/Ask/Ask";
import Answer from "./pages/Answer/Answer";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EditQuestion from "./pages/Ask/EditQuestion";

export const AppState = createContext();
import "./i18ntest";

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/checkUser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/question/:questionid" element={<Answer />} />
        <Route path="/edit-question/:questionId" element={<EditQuestion />} />
        <Route path="*" element={() => <h1>Page not found</h1>} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
