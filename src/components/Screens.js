import React from "react";

import LandingPage from "../modules/LandingPage";

import { appName } from "../Constants";
import DataBridge from "../helpers/DataBridge";

class Screens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default: this.props.default,
      current: this.props.current,
      previous: undefined,
    };

    this.changeScreen = this.changeScreen.bind(this);
  }

  componentDidMount() {
    window[appName].databridge.sub(DataBridge.TOPIC.CHANGE_SCREEN, this.changeScreen);
  }

  changeScreen(newScreen) {
    this.setState({ previous: this.state.current, current: newScreen });
  }

  render() {
    return this.state.current || this.props.default || <LandingPage />;
  }
}

export default Screens;
