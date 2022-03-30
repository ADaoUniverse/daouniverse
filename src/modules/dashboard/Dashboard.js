import React from "react";
import { appName } from "../../Constants";
import NetworkNotSupported from "../../components/dashboard/NetworkNotSupported";
import Safe from "./Safe";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <NetworkNotSupported />
        <h3>{window[appName].account}</h3>
        <Safe />
      </div>
    );
  }
}

export default Dashboard;
