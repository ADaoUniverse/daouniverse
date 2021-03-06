import { id } from "../../Constants";
import React from "react";
import VaultHelper from "../../helpers/vault/VaultHelper";

class Vault extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.helper = new VaultHelper();

    this.vaultAddress = "0x6b6941539Fd35dc7168bbCC4De76b3C3775b10B1";
    // this.tokenAddress = "0x99B12715269EBfaF78C427381A60cf0ed4De8AA0";

    // main net
    this.tokenAddress="0x7EF56b89C5fe0758831ac73aA9b2368917e44148"
  }

  render() {
    return (
      <div>
        <hr />
        <h1>Vault</h1>
        Vault Address:{" "}
        <input
          id={id.input.vault.DEPOSIT_VAULT_ADDRESS}
          placeholder="vault address"
          value={this.vaultAddress}
          disabled={true}
        />
        <br />
        Token Address:{" "}
        <input
          id={id.input.vault.DEPOSIT_TOKEN_ADDRESS}
          placeholder="token address"
          value={this.tokenAddress}
          disabled={true}
        />
        <br />
        <br />
        <b>Config Allowance for Vault</b>
        <br />
        <input id={id.input.vault.APPROVE_ALLOWANCE_AMOUNT} placeholder="allowance amount" type="number" />
        <button onClick={this.helper.approveAllowance}>Approve Allowance</button>
        <br />
        <br />
        <b>Deposit</b>
        <br />
        <input id={id.input.vault.DEPOSIT_TOKEN_AMOUNT} placeholder="token amount" type="number" />
        <button onClick={this.helper.deposit}>Deposit</button>
        <hr />
      </div>
    );
  }
}

export default Vault;
