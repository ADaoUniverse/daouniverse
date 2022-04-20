import { ethers } from "ethers";
import { appName, id } from "../../Constants";
import vaultAbi from "../../abi/vault/vault.json";
import TokenHelper from "../token/Token";

class VaultHelper {
  constructor() {}

  async approveAllowance() {
    const vaultAddress = document.getElementById(id.input.vault.DEPOSIT_VAULT_ADDRESS).value;
    const tokenAddress = document.getElementById(id.input.vault.DEPOSIT_TOKEN_ADDRESS).value;
    const allowanceAmount = document.getElementById(id.input.vault.APPROVE_ALLOWANCE_AMOUNT).value;
    await TokenHelper.approveAllowance(tokenAddress, vaultAddress, parseInt(allowanceAmount));
  }

  async deposit() {
    const vaultAddress = document.getElementById(id.input.vault.DEPOSIT_VAULT_ADDRESS).value;
    const tokenAddress = document.getElementById(id.input.vault.DEPOSIT_TOKEN_ADDRESS).value;
    const tokenAmount = document.getElementById(id.input.vault.DEPOSIT_TOKEN_AMOUNT).value;
    if (!vaultAddress) return alert("vault address required");
    if (!tokenAddress) return alert("token address required");
    if (!tokenAmount) return alert("token amount required");

    console.log(vaultAddress, tokenAddress, tokenAmount);

    const vault = new ethers.Contract(vaultAddress, vaultAbi, window[appName].wallet.getSigner());
    const res = await vault.depositToken(parseInt(tokenAmount), { gasLimit: 500000 });
    alert("Token deposited to vault");
    console.log(res);
  }
}

export default VaultHelper;
