import { ethers } from "ethers";
import DaoERC20Abi from "../../abi/token/DaoERC20.json";

class Token {
  constructor() {
    this.erc20tokenInterface = new ethers.utils.Interface(DaoERC20Abi);
  }

  getErc20TokenContractEncoded(_registrar, _name, _symbol, _initialAmount, _decimals) {
    return this.erc20tokenInterface.encodeFunctionData("constructor", [
      _registrar,
      _initialAmount,
      _name,
      _decimals,
      _symbol,
    ]);
  }
}

export default Token;
