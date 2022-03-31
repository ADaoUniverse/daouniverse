import { appName } from "../Constants";

export default {
  sendTxn: async (contract, methodName, ...params) => {
    const unsingedTxn = await contract.populateTransaction[methodName](...params);
    return await window[appName].wallet.getSigner().sendTransaction(unsingedTxn);
  },
};
