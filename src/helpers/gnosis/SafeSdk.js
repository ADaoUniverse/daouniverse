import { ethers } from "ethers";
import EthersAdapter from "@gnosis.pm/safe-ethers-lib";
import Safe from "@gnosis.pm/safe-core-sdk";

class SafeSdk {
  constructor(_safeAddress, _provider) {
    this.safeAddress = _safeAddress;
    this.init();
  }

  async init() {
    this.ethAdapter = new EthersAdapter({ ethers, signer: _provider.getSigner() });
    this.safe = await Safe.create({ ethAdapter: this.ethAdapter, safeAddress: _safeAddress });
  }
}

export default SafeSdk;
