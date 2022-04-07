import React from "react";

import Gnosis from "../../helpers/gnosis/Gnosis";

import { gnosisApi } from "../../helpers/Network";
import DataBridge from "../../helpers/DataBridge";
import { appName, id, token } from "../../Constants";
import SelectSafes from "../../components/dashboard/SelectSafes";
import CreateSafe from "../../components/dashboard/CreateSafe";
import SafeDetails from "../../components/dashboard/SafeDetails";
import DaoERC20 from "./DaoERC20";
import Safe from "../../helpers/gnosis/Safe";
import { getErc20TokenContractEncoded } from "../../helpers/token/Token";

const styles = {
  textarea: {
    width: "50%",
  },
};

class SafeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.gnosis = new Gnosis();

    this.initialState = {
      safes: [],
      safeDetails: undefined,
      currentSafe: undefined,
      currentSafeObj: undefined,
    };

    this.state = { ...this.initialState };

    this.init = this.init.bind(this);
    this.resetState = this.resetState.bind(this);
    this.selectSafe = this.selectSafe.bind(this);
    this.createSafe = this.createSafe.bind(this);
    this.getSafesForOwner = this.getSafesForOwner.bind(this);
    this.getSafeDetails = this.getSafeDetails.bind(this);

    this.createToken = this.createToken.bind(this);
    this._setCurrentSafe = this._setCurrentSafe.bind(this);
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
    this._setCurrentSafe(safeOption.value);
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
    const _owner = this.state.currentSafe;

    await this.state.currentSafeObj.deployContract(
      getErc20TokenContractEncoded(_owner, _registrar, _name, _symbol, _initialAmount, _decimals),
      "0x000000000000000000000000E52772e599b3fa747Af9595266b527A31611cebd000000000000000000000000000000000000000000000000000000000000000001"
    );
  }

  async getSafesForOwner() {
    const safes = await gnosisApi.getSafesForOwner(window[appName].account);
    this.setState({ safes });
    this._setCurrentSafe(safes[0]);
  }

  async getSafeDetails(safeAddress) {
    const safeDetails = await gnosisApi.getSafeDetails(safeAddress);
    this.setState({ safeDetails });
  }

  _setCurrentSafe(safe) {
    this.setState({ currentSafe: safe, currentSafeObj: new Safe(safe, window[appName].wallet) });
  }

  render() {
    return (
      <div>
        SAFE: <SelectSafes safes={this.state.safes} selected={this.state.currentSafe} selectSafe={this.selectSafe} />
        <SafeDetails safeDetails={this.state.safeDetails} />
        <CreateSafe createSafe={this.createSafe} />
        <DaoERC20 currentSafe={this.state.currentSafe} createToken={this.createToken} />
        <button
          onClick={async () =>
            this.state.currentSafeObj.signMessage(
              await this.state.currentSafeObj.getTransactionHash(
                "0xE52772e599b3fa747Af9595266b527A31611cebd",
                100000,
                0
              )
            )
          }
        >
          Sign Message
        </button>
        <button
          onClick={async () => {
            const txnHash = await this.state.currentSafeObj.getTransactionHash(
              "0xE52772e599b3fa747Af9595266b527A31611cebd",
              100000,
              0
            );
            const signed = await window[appName].wallet.getSigner().signMessage(txnHash);
            console.log("txn Hash", txnHash, signed);
          }}
        >
          Sign Txn Message
        </button>
      </div>
    );
  }
}

export default SafeComponent;
