const { ethers } = require("ethers");
const DaoERC20Abi = require("../../abi/token/DaoERC20.json");

const erc20tokenInterface = new ethers.utils.Interface(DaoERC20Abi);
const getErc20TokenContractEncoded = (_registrar, _name, _symbol, _initialAmount, _decimals) => {
  return erc20tokenInterface.encodeFunctionData("constructor", [_registrar, _initialAmount, _name, _decimals, _symbol]);
};

module.exports = {
  getErc20TokenContractEncoded,
};
