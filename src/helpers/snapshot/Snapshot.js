import SnapshotLib from "@snapshot-labs/snapshot.js";

const { appName, id, snapshot, _baseApi } = require("../../Constants");
const { snapshotApi, ensApi } = require("../Network");

const getEnsDomainsByAccount = async (cb) => {
  const _acc = window[appName].account.toLowerCase();
  const _query = `query Domain { 
    account(id:"${_acc}") { 
      domains { 
        name 
      }
    }
  }`;
  const res = (await ensApi.getEnsByAccount(_query)).data.account.domains;
  if (cb) cb(res);
  else return res;
};

const getSpace = async (ensDomain, _cb) => {
  const _query = `query { space(id: "${ensDomain}") {
    id
    name
    about
    symbol
    members
    admins
    network
    strategies {
      name
      network
      params
    }
    voting {
      delay
      period
      quorum
      type
    }
  }
}`;
  snapshotApi.graphQl(_query, _cb, "data.space");
};

const getSpaces = async (_cb, _first = 10, _skip = 0) => {
  const _query = `query Spaces {spaces(first: ${_first},skip: ${_skip},orderBy: "created",orderDirection: asc) {id\nname\nabout\nnetwork\nsymbol\nstrategies {name\nparams}\nadmins\nmembers\nfilters {minScore\nonlyMembers}\nplugins}}`;
  snapshotApi.graphQl(_query, _cb, "data.spaces");
};

const getSpacesIn = async (ensDomains, _cb) => {
  const _query = `query Spaces {
    spaces(
      where: {
        id_in: ${JSON.stringify(ensDomains)}
      }
    ) {
      id
      name
      symbol
      members
      admins
      network
      strategies {
        name
        network
        params
      }
      voting {
        delay
        period
        quorum
        type
      }
    }
  }`;
  snapshotApi.graphQl(_query, _cb, "data.spaces");
};

const getFollowedSpaces = async (_cb, _first = 10, _skip = 0) => {
  const _query = `query {
    follows(
      first: ${_first},
      skip: ${_skip},
      where: {
        follower: "${window[appName].account}"
      }
    ) {
      follower
      space {
        id
        name
        members
        admins
        network
        strategies {
          name
          network
          params
        }
        voting {
          delay
          period
          quorum
          type
        }
      }
    }
  }`;
  snapshotApi.graphQl(_query, _cb, "data.follows");
};

const createSpace = async () => {
  const _ens = document.getElementById(id.input.snapshot.ENS).value;
  const _spaceName = document.getElementById(id.input.snapshot.SPACE_NAME).value;
  const _spaceSymbol = document.getElementById(id.input.snapshot.SPACE_SYMBOL).value;

  if (!_ens) return alert("Snapshot ENS Required");
  if (!_spaceName) return alert("Snapshot Name Required");
  if (!_spaceSymbol) return alert("Snapshot Symbol Required");

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

const getProposals = async (_space, _cb) => {
  const _query = `query Proposals {
    proposals (
      first: 20,
      skip: 0,
      where: {
        space_in: ["${_space.id}"],
        state: "pending"
      },
      orderBy: "created",
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      author
      type
      space {
        id
        name
      }
    }
  }`;
  snapshotApi.graphQl(_query, _cb, "data.proposals");
};

const createProposal = async (_space, _title, _options) => {
  const snapshotClient = new SnapshotLib.Client712(_baseApi(snapshot));

  let delay = 0;
  let period = 0;
  if (_space.voting) {
    delay = _space.voting.delay || delay;
    period = _space.voting.period || period;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const startTime = timestamp + delay;
  const endTime = startTime + period;

  const data = {
    space: _space.id,
    type: _space.voting.type || "single-choice",
    title: _title,
    body: "",
    choices: _options,
    start: startTime,
    end: endTime,
    snapshot: await window[appName].wallet.getBlockNumber(),
    network: _space.network,
    strategies: JSON.stringify(_space.strategies),
    plugins: JSON.stringify({}),
    metadata: JSON.stringify({}),
    timestamp,
  };

  const receipt = await snapshotClient.proposal(window[appName].wallet, window[appName].account, data);
  console.log("createProposal", receipt);
};

const voteProposal = async (_proposal, _voteIndex) => {
  try {
    const snapshotClient = new SnapshotLib.Client712(_baseApi(snapshot));
    const receipt = await snapshotClient.vote(window[appName].wallet, window[appName].account, {
      space: _proposal.space.id,
      proposal: _proposal.id,
      type: _proposal.type,
      choice: _voteIndex,
      metadata: JSON.stringify({}),
    });
    console.log("vote proposal", receipt);
  } catch (e) {
    alert(e.error_description);
    throw e;
  }
};

export default {
  getEnsDomainsByAccount,
  getSpace,
  getSpaces,
  getSpacesIn,
  getFollowedSpaces,
  createSpace,
  getProposals,
  createProposal,
  voteProposal,
};
