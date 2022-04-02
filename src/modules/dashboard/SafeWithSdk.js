import React from "react";

import { ethers } from "ethers";

import { appName } from "../../Constants";
import SafeDetails from "../../components/dashboard/SafeDetails";

const styles = {
  textarea: {
    width: "50%",
  },
};

class SafeWithSdk extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      safes: [],
      safeDetails: undefined,
      currentSafe: undefined,
    };

    this.state = { ...this.initialState };

    this.init = this.init.bind(this);
    this.resetState = this.resetState.bind(this);
    this.selectSafe = this.selectSafe.bind(this);
    this.createSafe = this.createSafe.bind(this);
    this.getSafesForOwner = this.getSafesForOwner.bind(this);
    this.getSafeDetails = this.getSafeDetails.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    await this.getSafesForOwner();
    if (this.state.currentSafe) {
      await this.getSafeDetails(this.state.currentSafe);
    }
  }

  resetState() {
    this.setState({ ...this.initialState });
  }

  selectSafe(safeOption) {}

  async createSafe() {
  }

  async getSafesForOwner() {}

  async getSafeDetails(safeAddress) {}

  render() {
    return (
      <div>
        SAFE WITH SDK
        <div>
          <button onClick={this.createSafe}>Create Safe</button>
        </div>
      </div>
    );
  }
}

export default SafeWithSdk;
