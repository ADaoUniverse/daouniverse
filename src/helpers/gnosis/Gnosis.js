import { ethers } from "ethers";

import { appName, token } from "../../Constants";

// methods to setup safe
import safeAbi from "../../abi/gnosis/safe.json";
// interaction with contract
import proxyFactoryAbi from "../../abi/gnosis/proxy_factory.json";
import fallbackAbi from "../../abi/gnosis/fallback_handler.json";
import createCallAbi from "../../abi/gnosis/create_call.json";

import Txn from "../Txn";

import { getErc20TokenContractEncoded } from "../token/Token";

class Gnosis {
  constructor() {
    this.init();
  }

  init() {
    this.safeInterface = new ethers.utils.Interface(safeAbi.abi);
    this.contractFactory = new ethers.Contract(this._getFactoryAddress(), proxyFactoryAbi.abi, window[appName].wallet);
    this.createCallInterface = new ethers.utils.Interface(createCallAbi.abi);
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

  async deployContract(safeAddress, contractParams) {
    // cannot use ethers.Contract because the safeAddress is actually safeProxy address with fallback doing the delegation
    const signer = await window[appName].wallet.getSigner();
    const res = await signer.sendTransaction({
      to: safeAddress,
      data: this.safeInterface.encodeFunctionData("execTransaction", [
        this._getCreateCallContractAddress(),
        0,
        this._getPerformCreateData(contractParams),
        0,
        0,
        0,
        10000000,
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x000000000000000000000000E52772e599b3fa747Af9595266b527A31611cebd000000000000000000000000000000000000000000000000000000000000000001",
        // await signer.signMessage(ethers.utils.hashMessage("I approve")),
      ]),
      gasLimit: 10000000,
    });
    // const safeProxy = new ethers.Contract(safeAddress, safeProxyAbi, window[appName].wallet.getSigner());
    // const unsigned = await safeProxy.execTransaction(
    //   ,
    //   {
    //     gasLimit: 500000,
    //   }
    // );
    // const res = await window[appName].wallet.getSigner().sendTransaction(unsigned);
    // const safeContract = new ethers.Contract(safeAddress, safeAbi.abi, window[appName].wallet.getSigner());
    // const safeContract = new ethers.Contract(safeAddress, safeAbi.abi, window[appName].wallet.getSigner());
    // const res = await Txn.sendTxn(
    //   safeProxy,
    //   "execTransaction",
    //   this._getCreateCallContractAddress(),
    //   0,
    //   this._getPerformCreateData(contractParams),
    //   0,
    //   0,
    //   0,
    //   0,
    //   0,
    //   window[appName].account,
    //   {
    //     gasLimit: 500000,
    //   }
    // );
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

  _getPerformCreateData(contractParams) {
    return this.createCallInterface.encodeFunctionData("performCreate", [
      0,
      getErc20TokenContractEncoded(...contractParams),
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

/**
 * signTransaction from metamask
 *
 * ownable erc20 is ERC20
 */
