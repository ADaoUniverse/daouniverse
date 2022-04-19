import React from "react";
import { appName } from "../../Constants";
import SafeComponent from "./SafeComponent";
import Address from "../../components/Address";
import Toggle from "../../components/Toggle";
import DataBridge from "../../helpers/DataBridge";
import SnapshotComponent from "./SnapshotComponent";
import Vault from "./Vault";

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
        <h3>
          <Address a={window[appName].account} />({window[appName].network.name})
          <Toggle onChange={this.changeTheme} />
        </h3>
        <SafeComponent />
        <Vault />
        <SnapshotComponent />
      </div>
    );
  }
}

export default Dashboard;
