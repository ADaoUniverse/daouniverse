const appName = "daouniverse";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const links = {
  BUY_ENS_DOMAIN: "https://app.ens.domains/",
};

const id = {
  input: {
    token: {
      NAME: "input_token_name",
      SYMBOL: "input_token_symbol",
      INITIAL_AMOUNT: "input_token_intial_amount",
      DECIMALS: "input_token_decimals",
    },
    snapshot: {
      ENS: "input_snapshot_ens",
      SPACE_NAME: "input_snapshot_space_name",
      SPACE_SYMBOL: "input_snapshot_space_symbol",
      PROPOSAL_TITLE: "input_snapshot_proposal_title",
      PROPOSAL_OPTION: "input_snapshot_proposal_option",
    },
    vault: {
      APPROVE_ALLOWANCE_AMOUNT: "input_vault_approve_allowance_amount",
      DEPOSIT_VAULT_ADDRESS: "input_vault_deposit_vault_address",
      DEPOSIT_TOKEN_ADDRESS: "input_vault_deposit_token_address",
      DEPOSIT_TOKEN_AMOUNT: "input_vault_deposit_token_amount",
    },
  },
  modal: {
    space: {
      CREATE_PROPOSAL: "create_proposal",
    },
  },
};

const headers = {
  acceptJson: {
    accept: "application/json",
  },
  postJson: {
    accept: "application/json",
    "content-type": "application/json",
  },
};

const supportedNetworks = {
  supported: [1, 4, 137],
  options: [
    { label: "Ethereum", value: 1 },
    { label: "Rinkeby", value: 4 },
    { label: "Polygon", value: 137 },
  ],
};

const chainexplorer = {
  1: (a) => `https://etherscan.io/address/${a}`,
  3: (a) => `https://ropsten.etherscan.io/address/${a}`,
  4: (a) => `https://rinkeby.etherscan.io/address/${a}`,
  5: (a) => `https://goerli.etherscan.io/address/${a}`,
  42: (a) => `https://kovan.etherscan.io/address/${a}`,
  137: (a) => `https://polygonscan.com/address/${a}`,
};

const token = {
  registrar: {
    4: "0xE653C34113EE17d57Ef8d2909625F33bD53d9BdA",
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
    OWNER_SAFES: (owner) => `${_baseApi(gnosis)}/api/v1/owners/${owner}/safes/`,
    SAFE_DETAILS: (safe) => `${_baseApi(gnosis)}/api/v1/safes/${safe}/`,
  },
};

const snapshot = {
  baseapi: {
    1: "https://hub.snapshot.org",
  },
  api: {
    REST: () => `${_baseApi(snapshot)}/api/msg`,
    GRAPHQL: () => `${_baseApi(snapshot)}/graphql`,
  },
};

const ens = {
  baseapi: {
    1: "https://api.thegraph.com",
  },
  api: {
    GRAPHQL: () => `${_baseApi(ens)}/subgraphs/name/ensdomains/ens`,
  },
};

const _baseApi = (module) => module.baseapi[window[appName].network.chainId];

module.exports = {
  appName,
  links,
  id,
  headers,
  chainexplorer,
  supportedNetworks,
  token,
  gnosis,
  snapshot,
  ens,
  ZERO_ADDRESS,
  _baseApi,
};
