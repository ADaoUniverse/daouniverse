import React from "react";
import { ethers } from "ethers";

import { appName } from "../Constants";
import DataBridge from "../helpers/DataBridge";

import Dashboard from "./Dashboard";
import LoginScreen from "../components/LoginScreen";

class DashboardInit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    window[appName].wallet = new ethers.providers.Web3Provider(window.ethereum);

    this._setAccount = this._setAccount.bind(this);
    this.syncWalletData = this.syncWalletData.bind(this);
    this.getWalletConnectionStatus = this._syncWalletAccount.bind(this);
    this.getWalletAccount = this._getWalletAccount.bind(this);
    this.connectWallet = this.connectWallet.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.state.refreshWalletInterval.clear();
  }

  async init() {
    await this.syncWalletData();
    if (this.props.userClickedLogin) {
      await this.connectWallet();
    }
  }

  async syncWalletData() {
    const refreshWalletInterval = setInterval(async () => {
      await this._syncWalletAccount(window[appName].account);
      await this._syncWalletNetwork(window[appName].network);
    }, 1000);
    this.setState({ refreshWalletInterval });
  }

  async _syncWalletAccount(_account) {
    const account = await this._getWalletAccount();
    if (_account != account) {
      this._setAccount(account, _account);
    }
    return account;
  }

  async _syncWalletNetwork(_network) {
    const network = await this._getWalletNetwork();
    if (_network != network) {
      this._setNetwork(network, _network);
      // todo: handle this in module by receiving network change
      // if(!gnosis.baseapi[network.chainId]) {
      // alert("Network not supported!")
      // }
    }
    return network;
  }

  async connectWallet() {
    const accounts = await window[appName].wallet.send("eth_requestAccounts", []);
    this._setAccount(accounts[0]);
    return accounts[0];
  }

  async _getWalletAccount() {
    return (await window[appName].wallet.listAccounts())[0];
  }

  async _getWalletNetwork() {
    try {
      return await window[appName].wallet.getNetwork();
    } catch (e) {
      // network changed. ether.js suggests reload of website on network change
      window.location.reload();
    }
  }

  _setAccount(account, prevAccount) {
    window[appName].prevAccount = prevAccount;
    window[appName].account = account;
    window[appName].databridge.pub(DataBridge.TOPIC.ACCOUNT_CHANGE, { prevAccount, account });
    this.forceUpdate();
  }

  _setNetwork(network, prevNetwork) {
    window[appName].prevNetwork = prevNetwork;
    window[appName].network = network;
    window[appName].databridge.pub(DataBridge.TOPIC.NETWORK_CHANGE, { prevNetwork, network });
    this.forceUpdate();
  }

  render() {
    const shouldRenderDashboard = (window[appName].account && window[appName].network);
    return shouldRenderDashboard ? <Dashboard /> : <LoginScreen />;
  }
}

export default DashboardInit;
