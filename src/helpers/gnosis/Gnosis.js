import { ethers } from "ethers";

import { appName, token } from "../../Constants";

// methods to setup safe
import safeAbi from "../../abi/gnosis/safe.json";
// interaction with contract
import proxyFactoryAbi from "../../abi/gnosis/proxy_factory.json";
import fallbackAbi from "../../abi/gnosis/fallback_handler.json";

class Gnosis {
  constructor() {
    this.init();
  }

  init() {
    this.safeInterface = new ethers.utils.Interface(safeAbi.abi);
    this.contractFactory = new ethers.Contract(
      this._getFactoryAddress(),
      proxyFactoryAbi.abi,
      window[appName].wallet.getSigner()
    );
  }

  async createSafe(owners, threshold) {
    const res = await this.contractFactory.createProxyWithNonce(
      this._getSafeAddress(),
      this._getSafeSetupData(owners, threshold),
      Date.now(),
      {
        gasLimit: 500000,
      }
    );
    console.log(res);
    return res;
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

  _getAddress(abi) {
    const address = abi.networkAddresses[window[appName].network.chainId];
    if (!address) throw "Network not supported";
    return address;
  }
}

export default Gnosis;
