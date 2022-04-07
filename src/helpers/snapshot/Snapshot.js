const { appName, id } = require("../../Constants");
const { snapshotApi, ensApi } = require("../Network");

const getEnsDomainsByAccount = async (cb) => {
  const _acc = window[appName].account.toLowerCase();
  const _query = `query Domain { account(id:"${_acc}") { domains { name }}}`;
  const res = (await ensApi.getEnsByAccount(_query)).data.account.domains;
  if (cb) cb(res);
  else return res;
};

const getSpace = async (ensDomain, _cb) => {
  const _query = `query { space(id: "${ensDomain}") {id\nname\nabout\nnetwork\nsymbol\nmembers}}`;
  snapshotApi.graphQl(_query, _cb, "data.space");
};

const getSpaces = async (_cb, _first = 20, _skip = 0) => {
  const _query = `query Spaces {spaces(first: ${_first},skip: ${_skip},orderBy: "created",orderDirection: asc) {id\nname\nabout\nnetwork\nsymbol\nstrategies {name\nparams}\nadmins\nmembers\nfilters {minScore\nonlyMembers}\nplugins}}`;
  snapshotApi.graphQl(_query, _cb, "data.spaces");
};

const getSpacesIn = async (ensDomains, _cb) => {
  const _query = `query Spaces {spaces(where: {id_in: ${JSON.stringify(
    ensDomains
  )}}) {id\nname\nnetwork\nsymbol\nmembers}}`;
  snapshotApi.graphQl(_query, _cb, "data.spaces");
};

const createSpace = async () => {
  const _ens = document.getElementById(id.input.snapshot.ENS).value;
  const _spaceName = document.getElementById(id.input.snapshot.SPACE_NAME).value;
  const _spaceSymbol = document.getElementById(id.input.snapshot.SPACE_SYMBOL).value;

  if (!_ens) return alert("Snapshot ENS Requried");
  if (!_spaceName) return alert("Snapshot Name Requried");
  if (!_spaceSymbol) return alert("Snapshot Symbol Requried");

  const _acc = window[appName].account;

  const domain = {
    name: "snapshot",
    version: "0.1.4",
  };

  const types = {
    Space: [
      {
        name: "from",
        type: "address",
      },
      {
        name: "space",
        type: "string",
      },
      {
        name: "timestamp",
        type: "uint64",
      },
      {
        name: "settings",
        type: "string",
      },
    ],
  };

  const _settings = {
    name: _spaceName,
    symbol: _spaceSymbol,
    network: window[appName].network.chainId,
    admins: [_acc],
    strategies: [{ name: "ticket", params: {} }],
  };

  const message = {
    space: _ens,
    settings: JSON.stringify(_settings),
    from: _acc,
    timestamp: Math.floor(Date.now() / 1000),
  };

  const sign = await window[appName].wallet.getSigner()._signTypedData(domain, types, message);
  const body = {
    address: _acc,
    sig: sign,
    data: {
      domain,
      types,
      message,
    },
  };

  const res = await snapshotApi.createSpace(body);
  console.log(res);
  return res;
};

export default {
  getEnsDomainsByAccount,
  getSpace,
  getSpaces,
  getSpacesIn,
  createSpace,
};
