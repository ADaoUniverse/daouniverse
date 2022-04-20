const { ethers } = require("ethers");
const DaoERC20Abi = require("../../abi/token/DaoERC20.json");
const DaoERC20ByteCode = require("../../bytecode/DaoERC20.json");
const { appName } = require("../../Constants");

const erc20tokenInterface = new ethers.utils.Interface(DaoERC20Abi);
const getErc20TokenContractEncoded = (_owner, _registrar, _name, _symbol, _initialAmount, _decimals) => {
  const factory = new ethers.ContractFactory(DaoERC20Abi, DaoERC20ByteCode.object, window[appName].wallet.getSigner());
  const res = factory.getDeployTransaction(_owner, _registrar, _initialAmount, _name, _decimals, _symbol).data;
  return res;
};

const approveAllowance = async (tokenAddress, spenderAddress, allowanceAmount) => {
  const tokenContract = new ethers.Contract(tokenAddress, DaoERC20Abi, window[appName].wallet.getSigner());
  console.log(tokenAddress, spenderAddress, allowanceAmount);
  const res = await tokenContract.approve(spenderAddress, allowanceAmount);
  console.log(res);
  alert("approving allowance");
};

export default {
  getErc20TokenContractEncoded,
  approveAllowance,
};
