var _ = require("lodash");

const { ens, snapshot, gnosis, headers } = require("../Constants");

const getRequest = async (_api) => {
  const response = await fetch(_api, {
    method: "GET",
    headers: headers.acceptJson,
  });
  if (!response.ok) throw response;
  return await response.json();
};

const postRequest = async (_api, _body) => {
  const response = await fetch(_api, {
    method: "POST",
    headers: headers.postJson,
    body: JSON.stringify(_body),
  });
  if (!response.ok) throw response;
  return await response.json();
};

module.exports = {
  gnosisApi: {
    getSafesForOwner: async (ownerAddress) => {
      return (await getRequest(gnosis.api.OWNER_SAFES(ownerAddress))).safes || [];
    },
    getSafeDetails: async (safeAddress) => {
      return await getRequest(gnosis.api.SAFE_DETAILS(safeAddress));
    },
  },

  snapshotApi: {
    graphQl: async (_query, _cb, _dataSelector) => {
      const res = await postRequest(snapshot.api.GRAPHQL(), { query: _query });
      const data = _.get(res, _dataSelector);
      if (_cb) return _cb(data);
      else return data;
    },
    rest: async (_body) => {
      return await postRequest(snapshot.api.REST(), _body);
    },
    leaveSpace: async (_body) => {},
  },

  ensApi: {
    getEnsByAccount: async (_query) => {
      return await postRequest(ens.api.GRAPHQL(), { query: _query });
    },
  },
};
