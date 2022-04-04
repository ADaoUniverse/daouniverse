import React from "react";

import { appName } from "../Constants";
import DataBridge from "../helpers/DataBridge";

import Theme from "../components/Theme";
import Screens from "../components/Screens";
import LandingPage from "./LandingPage";

// todo: remove this ether plug
import { ethers } from "ethers";

class Main extends React.Component {
  constructor(props) {
    super(props);

    window[appName] = {};
    window[appName].databridge = new DataBridge();
    window[appName].ethers = ethers;
  }

  render() {
    return (
      <div>
        <Theme />
        <Screens
          databridgeTopic={DataBridge.TOPIC.CHANGE_SCREEN.MAIN}
          current={<LandingPage />}
          default={<LandingPage />}
        />
      </div>
    );
  }
}

export default Main;
