import { useState } from "react";

import {Column, Columns} from "../components/Columns"
import HomeMenu from "./HomeMenu";
import Dashboard from "./Dashboard"
import Config from "./Config"

function Home() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [shownPage, setShownPage] = useState("dashboard");

  return (
      <Columns>
        <Column isNarrow={true}>
          <HomeMenu sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} setPage={setShownPage}/>
        </Column>
        <Column>
          {shownPage === "dashboard" && <Dashboard />}
          {shownPage === "config" && <Config />}
        </Column>
      </Columns>
  );
}

export default Home;
