import { ethers } from "ethers";
import { appName, id, token } from "../../../Constants";
import DataBridge from "../../../helpers/DataBridge";
import DaoERC20Abi from "../../../abi/token/DaoERC20.json";
import DaoERC20ByteCode from "../../../bytecode/DaoERC20.json";

export default () => {
  const createToken = async () => {
    const factory = new ethers.ContractFactory(DaoERC20Abi, DaoERC20ByteCode.object, window[appName].wallet.getSigner());

    const name = document.getElementById(id.input.token.NAME).value;
    const symbol = document.getElementById(id.input.token.SYMBOL).value;
    const initialAmount = document.getElementById(id.input.token.INITIAL_AMOUNT).value;
    const decimals = document.getElementById(id.input.token.DECIMALS).value;

    const registrar = token.registrar[window[appName].network.chainId];

    const tokenAddress = await factory.deploy(registrar, initialAmount, name, decimals, symbol);
    window[appName].databridge.pub(DataBridge.TOPIC.TOKEN_CREATED, tokenAddress);
  };

  return (
    <div>
      Token Name <input id={id.input.token.NAME} />
      <br />
      Token Symbol <input id={id.input.token.SYMBOL} />
      <br />
      Initial Amount <input id={id.input.token.INITIAL_AMOUNT} />
      <br />
      Decimals <input id={id.input.token.DECIMALS} />
      <br />
      {/* <button onClick={createToken}>Create Token</button> */}
    </div>
  );
};
