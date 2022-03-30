import React from "react";

import { appName } from "../Constants";

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
    window[appName].databridge.sub(this.props.databridgeTopic, this.changeScreen);
  }

  changeScreen(newScreen) {
    this.setState({ previous: this.state.current, current: newScreen });
  }

  render() {
    return this.state.current || this.props.default;
  }
}

export default Screens;
