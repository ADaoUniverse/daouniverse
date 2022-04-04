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
    console.log(_txnHash);
    const res = await this.signContract.signMessage(_txnHash, { gasLimit: 1000000 });
    console.log(res);
    return res;
  }

  async execTransaction(_to, _value, _data, _signatures) {
    console.log(_to, _value, _data, _signatures);
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
      { gasLimit: 10000000 }
    );
  }

  async deployContract(_contractData, _signatures) {
    const res = await this.execTransaction(
      this._getCreateCallContractAddress(),
      0,
      this._getPerformCreateData(_contractData),
      _signatures
    );
    console.log(res);
    return res;
  }

  _getPerformCreateData(_contractData) {
    return this.createCallInterface.encodeFunctionData("performCreate", [0, _contractData]);
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
