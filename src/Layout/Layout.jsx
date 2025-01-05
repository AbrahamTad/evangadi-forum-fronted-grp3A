import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";



// export default Layout;
function Layout({children}) {
  return (
    <div>
      <Header/>
      <div style={{minHeight:"100vh !important"}}>
      {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout

