import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { appName, token } from "../../../Constants";
import tokenRegistrarAbi from "../../../abi/token/TokenRegistrar.json";

import Address from "../../Address";
import TokenDetails from "./TokenDetails";

export default ({ owner }) => {
  const [tokens, setTokens] = useState([]);
  const [total, setTotal] = useState(0);

  const _registrar = token.registrar[window[appName].network.chainId];
  if (!_registrar) return <div>No Tokens</div>;
  /**
   * Need to use signer because provider doesn't include account address details.
   * So, msg.sender is not resolved and returns empty array
   */
  const registrarContract = new ethers.Contract(_registrar, tokenRegistrarAbi, window[appName].wallet.getSigner());

  const getTokens = async () => {
    const tokens = await registrarContract.getTokens(owner);
    const total = (await registrarContract.getTokensCount(owner)).toString();

    setTokens(tokens);
    setTotal(total);
  };

  useEffect(() => {
    getTokens();
  }, [owner]);

  return (
    <div>
      Tokens:{" "}
      {tokens.map((token) => (
        <div>
          <TokenDetails key={token} address={token} owner={owner} />
        </div>
      ))}
      <br />
      Length: {total}
      <br />
    </div>
  );
};
