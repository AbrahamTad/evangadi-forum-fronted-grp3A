import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: {
        welcome: "Welcome to Evangadi Networks",
        about: "About",
        description:
          "No matter what stage of life you are in, you have much to offer to those who are trying to follow in your footsteps.",
      },
      login: {
        title: "Login to your account",
        noAccount: "Don’t have an account?",
        createAccount: "Create a new account",
        email: "Email address",
        password: "Password",
        forgotPassword: "Forgot password?",
        login: "Login",
      },
      register: {
        title: "Join the network",
        alreadyHaveAccount: "Already have an account?",
        signIn: "Sign in",
        userName: "User name",
        firstName: "First name",
        lastName: "Last name",
        email: "Email address",
        password: "Password",
        agreeTerms: "I agree to the privacy policy and terms of service.",
        join: "Agree and Join",
      },
      buttons: {
        signIn: "Sign In",
        signOut: "Sign Out",
        howItWorks: "HOW IT WORKS",
        postQuestion: "Post Question",
        postAnswer: "Post Answer",
      },
    },
  },
  am: {
    translation: {
      home: {
        welcome: "እንኳን በደህና መጡ ወደ ኢቫንጋዲ ኔትወርክስ",
        about: "ስለ",
        description:
          "ሕይወት በምን ደረጃም እንኳን እንደምትገኙ አንዳች ለማድረግ በጣም ተቸጋሚ እና አስፈላጊ ነው።",
      },
      login: {
        title: "ወደ መለያዎ ይግቡ",
        noAccount: "መለያ የለህም?",
        createAccount: "አዲስ መለያ ፍጠር",
        email: "ኢሜይል አድራሻ",
        password: "የይለፍ ቃል",
        forgotPassword: "የይለፍ ቃልን ረስተዋል?",
        login: "ግባ",
      },
      register: {
        title: "ወደ ኔትወርክ ይቀላቀሉ",
        alreadyHaveAccount: "መለያ አላችሁ?",
        signIn: "ግባ",
        userName: "የተጠቃሚ ስም",
        firstName: "የመጀመሪያ ስም",
        lastName: "የመጨረሻ ስም",
        email: "ኢሜይል አድራሻ",
        password: "የይለፍ ቃል",
        agreeTerms: "ስለ ግላዊነት ፖሊሲና አስፈቀድና አገልግሎት መመሪያዎች እንደምንሆን።",
        join: "እሺ እና ይቀላቀሉ",
      },
      buttons: {
        signIn: "ግባ",
        signOut: "ውጣ",
        howItWorks: "እንዴት እንደሚሰራ",
        postQuestion: "ጥያቄ ላክ",
        postAnswer: "መልስ ላክ",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
