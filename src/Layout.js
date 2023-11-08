import { Outlet } from "react-router-dom";

import Navbar from "./Navbar.js"
// import Footer from "./Footer.js";

const Layout = () => {
  return (
    <div className="hero is-fullheight">
        <Navbar />

        <Outlet />
        {/* <Footer/> */}
        <div>FOOTER</div>
    </div>
  )
};

export default Layout;