import { ethers } from "ethers";

import { appName } from "../../Constants";

// methods to setup safe
import safeAbi from "../../abi/gnosis/safe.json";
// interaction with contract
import proxyFactoryAbi from "../../abi/gnosis/proxy_factory.json";
import fallbackAbi from "../../abi/gnosis/fallback_handler.json";
import createCallAbi from "../../abi/gnosis/create_call.json";

import Txn from "../Txn";

class Gnosis {
  constructor() {
    this.init();
  }

  init() {
    this.safeInterface = new ethers.utils.Interface(safeAbi.abi);
    this.contractFactory = new ethers.Contract(this._getFactoryAddress(), proxyFactoryAbi.abi, window[appName].wallet);

    this.createCallContract = new ethers.Contract(
      this._getCreateCallContractAddress(),
      createCallAbi.abi,
      window[appName].wallet.getSigner()
    );
  }

  async createSafe(owners, threshold) {
    const res = await Txn.sendTxn(
      this.contractFactory,
      "createProxyWithNonce",
      this._getSafeAddress(),
      this._getSafeSetupData(owners, threshold),
      new Date().getTime(),
      {
        gasLimit: 500000,
      }
    );
    console.log(res);
    return res;
  }

  async deployContract(data) {
    const res = await Txn.sendTxn(this.createCallContract, "performCreate", 0, data, { gasLimit: 1000000 });
  }

  _getSafeSetupData(owners, threshold) {
    return this.safeInterface.encodeFunctionData("setup", [
      owners,
      threshold,
      "0x0000000000000000000000000000000000000000",
      "0x",
      this._getFallbackAddress(),
      "0x0000000000000000000000000000000000000000",
      "0",
      "0x0000000000000000000000000000000000000000",
    ]);
  }

  _getFactoryAddress() {
    return this._getAddress(proxyFactoryAbi);
  }

  _getSafeAddress() {
    return this._getAddress(safeAbi);
  }

  _getFallbackAddress() {
    return this._getAddress(fallbackAbi);
  }

  _getCreateCallContractAddress() {
    return this._getAddress(createCallAbi);
  }

  _getAddress(abi) {
    const address = abi.networkAddresses[window[appName].network.chainId];
    if (!address) throw "Network not supported";
    return address;
  }
}

export default Gnosis;
