import { useState } from "react";

import {Column, Columns} from "../components/Columns"
import HomeMenu from "./HomeMenu";

function Home() {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
      <Columns>
        <Column isNarrow={true}>
          <HomeMenu sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
        </Column>
        <Column>
          <div className="box">
            <p className="has-text-centered title">NginUI Home</p>
          </div>
        </Column>
      </Columns>
  );
}

export default Home;
