const { ethers } = require("ethers");
const DaoERC20Abi = require("../../abi/token/DaoERC20.json");
const DaoERC20ByteCode = require("../../bytecode/DaoERC20.json");
const { appName } = require("../../Constants");

const erc20tokenInterface = new ethers.utils.Interface(DaoERC20Abi);
const getErc20TokenContractEncoded = (_registrar, _name, _symbol, _initialAmount, _decimals) => {
  const factory = new ethers.ContractFactory(DaoERC20Abi, DaoERC20ByteCode.object, window[appName].wallet.getSigner());
  const res = (factory.getDeployTransaction(_registrar, _initialAmount, _name, _decimals, _symbol)).data;
  console.log("erc20 encoded", res);
  return res;
};

module.exports = {
  getErc20TokenContractEncoded,
};
