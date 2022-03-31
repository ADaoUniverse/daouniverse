import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { appName, token } from "../../../Constants";
import tokenRegistrarAbi from "../../../abi/token/TokenRegistrar.json";

import Address from "../../Address";

export default () => {
  const [tokens, setTokens] = useState([]);
  const [total, setTotal] = useState(0);

  const _registrar = token.registrar[window[appName].network.chainId];
  /**
   * Need to use signer because provider doesn't include account address details.
   * So, msg.sender is not resolved and returns empty array
   */
  const registrarContract = new ethers.Contract(_registrar, tokenRegistrarAbi, window[appName].wallet.getSigner());

  const getTokens = async () => {
    const tokens = await registrarContract.getTokens();
    const total = (await registrarContract.getTokensCount()).toString();

    setTokens(tokens);
    setTotal(total);
  };

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <div>
      Tokens:{" "}
      {tokens.map((token) => (
        <div>
          <Address key={token} a={token} />
        </div>
      ))}
      <br />
      Length: {total}
      <br />
    </div>
  );
};
