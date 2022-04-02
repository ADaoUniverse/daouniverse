import React from "react";

import Gnosis from "../../helpers/gnosis/Gnosis";

import network from "../../helpers/gnosis/Network";
import DataBridge from "../../helpers/DataBridge";
import { appName, id, token } from "../../Constants";
import SelectSafes from "../../components/dashboard/SelectSafes";
import CreateSafe from "../../components/dashboard/CreateSafe";
import SafeDetails from "../../components/dashboard/SafeDetails";

const styles = {
  textarea: {
    width: "50%",
  },
};

class Safe extends React.Component {
  constructor(props) {
    super(props);
    this.gnosis = new Gnosis();

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

    this.createToken = this.createToken.bind(this);
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

  selectSafe(safeOption) {
    this.setState({ currentSafe: safeOption.value });
    this.getSafeDetails(safeOption.value);
  }

  async createSafe() {
    const owners = document.getElementById("safe_owners").value.split("\n");
    const threshold = parseInt(document.getElementById("safe_vote_threshold").value);

    if (!owners || !threshold) return alert("Need to enter owners and threshold");
    if (owners.length < threshold) return alert("Invalid threshold");

    const res = await this.gnosis.createSafe(owners, threshold);
  }

  async createToken() {
    const _name = document.getElementById(id.input.token.NAME).value;
    const _symbol = document.getElementById(id.input.token.SYMBOL).value;
    const _initialAmount = document.getElementById(id.input.token.INITIAL_AMOUNT).value;
    const _decimals = document.getElementById(id.input.token.DECIMALS).value;

    const _registrar = token.registrar[window[appName].network.chainId];

    await this.gnosis.deployContract(this.state.currentSafe, [_registrar, _name, _symbol, _initialAmount, _decimals]);
  }

  async getSafesForOwner() {
    const safes = await network.getSafesForOwner(window[appName].account);
    this.setState({ safes, currentSafe: safes[0] });
  }

  async getSafeDetails(safeAddress) {
    const safeDetails = await network.getSafeDetails(safeAddress);
    this.setState({ safeDetails });
  }

  render() {
    return (
      <div>
        SAFE: <SelectSafes safes={this.state.safes} selected={this.state.currentSafe} selectSafe={this.selectSafe} />
        <SafeDetails safeDetails={this.state.safeDetails} />
        <CreateSafe createSafe={this.createSafe} />
        <button onClick={this.createToken}>Create Token From Gnosis</button>
      </div>
    );
  }
}

export default Safe;
