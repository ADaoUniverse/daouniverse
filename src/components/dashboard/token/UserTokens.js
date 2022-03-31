import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { appName, token } from "../../../Constants";
import tokenRegistrarAbi from "../../../abi/token/TokenRegistrar.json";

export default () => {
  const [tokens, setTokens] = useState([]);
  const [total, setTotal] = useState(0);

  const _registrar = token.registrar[window[appName].network.chainId];
  const registrarContract = new ethers.Contract(_registrar, tokenRegistrarAbi, window[appName].wallet);

  const getTokens = async () => {
    const tokens = await registrarContract.getTokens();
    const total = (await registrarContract.getTokensCount()).toString();

    setTokens(tokens);
    setTotal(total);

    console.log(_registrar, window[appName].account, window[appName].network.chainId, tokens);
    console.log(_registrar, window[appName].account, window[appName].network.chainId, total);
  };

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <div>
      Tokens: {JSON.stringify(tokens)}
      <br />
      Length: {total}
      <br />
    </div>
  );
};
