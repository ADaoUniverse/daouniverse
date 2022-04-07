import { ethers } from "ethers";
import safeAbi from "../../abi/gnosis/safe.json";
import signAbi from "../../abi/gnosis/sign_message_lib.json";
import createCallAbi from "../../abi/gnosis/create_call.json";
import { appName, ZERO_ADDRESS } from "../../Constants";

class Safe {
  constructor(_safeAddress, _provider) {
    this.safeAddress = _safeAddress;

    this.safeContract = new ethers.Contract(_safeAddress, safeAbi.abi, _provider.getSigner());
    this.signContract = new ethers.Contract(_safeAddress, signAbi.abi, _provider.getSigner());

    this.createCallInterface = new ethers.utils.Interface(createCallAbi.abi);

    // todo: remove this
    window.safeContract = this.safeContract;
    window.signContract = this.signContract;

  }

  async getNonce() {
    return ethers.utils.hexValue(await this.safeContract.nonce());
  }

  async getTransactionHash(_to, _value, _data) {
    return await this.safeContract.getTransactionHash(
      _to,
      _value,
      _data,
      0,
      0,
      0,
      0,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      await this.getNonce()
    );
  }

  async signMessage(_txnHash) {
    const res = await this.execTransaction(
      this.safeAddress,
      0,
      this.createCallInterface.encodeFunctionData("signMessage", [_txnHash]),
      this._getSelfSign()
    );
    console.log(res);
    return res;
  }

  async execTransaction(_to, _value, _data, _signatures) {
    return await this.safeContract.execTransaction(
      _to,
      _value,
      _data,
      0,
      0,
      0,
      0,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      _signatures,
      { gasLimit: 500000 }
    );
  }

  async deployContract(_contractData, _signatures) {
    // test code-------------------------------
    const params = [
      this._getCreateCallContractAddress(),
      0,
      this.createCallInterface.encodeFunctionData("performCreate", [0, _contractData]),
    ];
    // const txnHash = await this.getTransactionHash(...params);

    const domain = {};
    const types = {
      Message: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
        { name: "operation", type: "uint256" },
        { name: "safeTxGas", type: "uint256" },
        { name: "baseGas", type: "uint256" },
        { name: "gasPrice", type: "uint256" },
        { name: "gasToken", type: "address" },
        { name: "refundReceiver", type: "address" },
      ],
    };
    const value = {
      to: params[0],
      value: params[1],
      data: params[2],
      operation: 0,
      safeTxGas: 0,
      baseGas: 0,
      gasPrice: 0,
      gasToken: ZERO_ADDRESS,
      refundReceiver: ZERO_ADDRESS,
    };
    // todo: _signTypedData will be renamed
    const sign = await window[appName].wallet.getSigner()._signTypedData(domain, types, value);
    const res = await this.execTransaction(...params, sign);
    // test code-------------------------

    // const res = await this.execTransaction(
    //   this._getCreateCallContractAddress(),
    //   0,
    //   this.createCallInterface.encodeFunctionData("performCreate", [0, _contractData]),
    //   _signatures
    // );
    console.log(res);
    return res;
  }

  _getSelfSign() {
    return `0x000000000000000000000000${window[appName].account}000000000000000000000000000000000000000000000000000000000000000001`;
  }

  _getSignContractAddress() {
    return this._getAddress(signAbi);
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

export default Safe;
