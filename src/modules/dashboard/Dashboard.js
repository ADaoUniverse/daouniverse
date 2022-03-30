import React from "react";
import { appName } from "../../Constants";
import NetworkNotSupported from "../../components/dashboard/NetworkNotSupported";
import Safe from "./Safe";
import Address from "../../components/Address";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <NetworkNotSupported />
        <h3><Address>{window[appName].account}</Address></h3>
        <Safe />
      </div>
    );
  }
}

export default Dashboard;
