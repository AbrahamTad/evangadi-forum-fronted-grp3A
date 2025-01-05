import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import en from "./locales/en/translation.json";
import am from "./locales/am/translation.json";
import { BrowserRouter } from "react-router-dom";

i18next.init({
  lng: "en", // Default language
  resources: {
    en: { translation: en },
    am: { translation: am },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </BrowserRouter>
);

