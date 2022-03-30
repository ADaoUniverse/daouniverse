import React from "react";
import { appName } from "../../Constants";
import NetworkNotSupported from "../../components/dashboard/NetworkNotSupported";
import Safe from "./Safe";
import Address from "../../components/Address";
import Toggle from "../../components/Toggle";
import DataBridge from "../../helpers/DataBridge";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  changeTheme(isDark) {
    window[appName].databridge.pub(DataBridge.TOPIC.REQUEST_THEME_TOGGLE, isDark);
  }

  render() {
    return (
      <div>
        <NetworkNotSupported />
        <h3>
          <Address>{window[appName].account}</Address>
          <Toggle onChange={this.changeTheme} />
        </h3>
        <Safe />
      </div>
    );
  }
}

export default Dashboard;
