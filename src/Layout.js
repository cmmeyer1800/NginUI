import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar.js"
import Footer from "./Footer.js";
import {Column, Columns} from "./components/Columns"
import HomeMenu from "./Home/HomeMenu";


const Layout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <div className="hero is-fullheight">
        <Navbar />
        <div className="ml-1 mr-1 is-fullheight">
          <Columns>
            <Column isNarrow={true}>
              <HomeMenu sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
            </Column>
            <Column>
              <Outlet />
            </Column>
            </Columns>
        </div>
        <Footer/>
    </div>
  );
};

export default Layout;