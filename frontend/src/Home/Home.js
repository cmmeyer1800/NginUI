import { useState } from "react";

import {Column, Columns} from "../components/Columns"
import HomeMenu from "./HomeMenu";
import Dashboard from "./Dashboard"
import Config from "./Config"

function Home() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [shownPage, setShownPage] = useState("dashboard");

  return (
    <div>
      <br></br>
      <Columns>
        <Column width={1}>
          <HomeMenu sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} setPage={setShownPage}/>
        </Column>
        <Column width={1}></Column> {/* Spacer */}
        <Column>
          {shownPage === "dashboard" && <Dashboard />}
          {shownPage === "config" && <Config />}
        </Column>
        <Column isNarrow></Column>
      </Columns>
    </div>
  );
}

export default Home;
