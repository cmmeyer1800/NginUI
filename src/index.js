import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bulma/css/bulma.min.css';

import Home from "./Home/Home.js";
import Settings from "./Settings";
import Layout from "./Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/settings" element={<Settings/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
