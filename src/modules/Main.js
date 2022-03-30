import React from "react";

import { appName } from "../Constants";
import DataBridge from "../helpers/DataBridge";

import Theme from "../components/Theme";
import Screens from "../components/Screens";
import LandingPage from "./LandingPage";


class Main extends React.Component {
  constructor(props) {
    super(props);

    window[appName] = {};
    window[appName].databridge = new DataBridge();
  }

  render() {
    return (
      <div>
        <Theme />
        <Screens current={<LandingPage />} default={<LandingPage />} />
      </div>
    );
  }
}

export default Main;
