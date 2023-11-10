import { Outlet } from "react-router-dom";

import Navbar from "./Navbar.js"
import Footer from "./Footer.js";

const Layout = () => {
  return (
    <div className="hero is-fullheight">
        <Navbar />
        <div className="ml-1 mr-1 is-fullheight">
          <Outlet />
        </div>
        <Footer/>
    </div>
  );
};

export default Layout;