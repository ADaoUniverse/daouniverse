const appName = "daouniverse";

const id = {
  input: {
    token: {
      NAME: "input_token_name",
      SYMBOL: "input_token_symbol",
      INITIAL_AMOUNT: "input_token_intial_amount",
      DECIMALS: "input_token_decimals",
    },
  },
};

const headers = {
  acceptJson: {
    accept: "application/json",
  },
};

const supportedNetworks = [
  { label: "Ethereum", value: 1 },
  { label: "Rinkeby", value: 4 },
  { label: "Polygon", value: 137 },
];

const etherscan = {
  1: (a) => `https://etherscan.io/address/${a}`,
  4: (a) => `https://rinkeby.etherscan.io/address/${a}`,
};

const token = {
  registrar: {
    4: "0x589554C98c33d74f02B00826AB76e14801046ba3",
  },
};

const gnosis = {
  baseapi: {
    1: "https://safe-transaction.mainnet.gnosis.io",
    4: "https://safe-transaction.rinkeby.gnosis.io",
    5: "https://safe-transaction.goerli.gnosis.io",
    10: "https://safe-transaction.optimism.gnosis.io",
    56: "https://safe-transaction.bsc.gnosis.io",
    100: "https://safe-transaction.xdai.gnosis.io",
    137: "https://safe-transaction.polygon.gnosis.io",
    246: "https://safe-transaction.ewc.gnosis.io",
    42161: "https://safe-transaction.arbitrum.gnosis.io",
    43114: "https://safe-transaction.avalanche.gnosis.io",
    73799: "https://safe-transaction.volta.gnosis.io",
    1313161554: "https://safe-transaction.aurora.gnosis.io",
  },
  api: {
    OWNER_SAFES: (owner) => `${_baseApi()}/api/v1/owners/${owner}/safes/`,
    SAFE_DETAILS: (safe) => `${_baseApi()}/api/v1/safes/${safe}/`,
  },
};

const _baseApi = () => gnosis.baseapi[window[appName].network.chainId];

module.exports = {
  appName,
  id,
  headers,
  etherscan,
  supportedNetworks,
  token,
  gnosis,
};
