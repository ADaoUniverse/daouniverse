import React from "react";

import { appName } from "../Constants";
import DataBridge from "../helpers/DataBridge";

import Logo from "../res/logo.svg";
import DashboardContainer from "./DashboardContainer";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  login() {
    window[appName].databridge.pub(DataBridge.TOPIC.CHANGE_SCREEN, <DashboardContainer userClickedLogin={true} />);
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <img className="navitem navitem-logo" src={Logo} />
          <div className="navitem">
            <button onClick={this.login}>Go to Dashboard</button>
          </div>
        </div>
        <h1>Start Your DAO Here</h1>
        <h5>
          Dao Universe simplifies your organization accounting and decision making to help you focus in what matters the
          most.
        </h5>
        <button onClick={this.login}>Connect Wallet</button>
        <h5>
          <b>Powered By </b>
          <img src="https://coinshift.xyz/static/gnosis-icon-2140c8af21b8b47bf12a77e95017df1d.svg" />
        </h5>
      </div>
    );
  }
}

export default LandingPage;
