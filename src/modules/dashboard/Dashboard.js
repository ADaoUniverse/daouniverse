import React from "react";
import { appName } from "../../Constants";
import Safe from "./Safe";
import Address from "../../components/Address";
import Toggle from "../../components/Toggle";
import DataBridge from "../../helpers/DataBridge";
import DaoERC20 from "./DaoERC20";

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
        <Safe />
        <DaoERC20 />
      </div>
    );
  }
}

export default Dashboard;
