import { id, links } from "../../../Constants";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import Snapshot from "../../../helpers/snapshot/Snapshot";

const ExistingSpaces = ({ spaces }) => {
  const _spaces = [];
  for (let i = 0; i < spaces.length; i++) {
    const space = spaces[i];
    _spaces.push(
      <div>
        <b>{space.name}</b> ({space.id}) - {space.members.length} members
      </div>
    );
  }
  return (
    <div>
      <h5>My Spaces</h5>
      {_spaces}
    </div>
  );
};

const JoinedSpaces = ({ spaces }) => {
  console.log(spaces);
  const _spaces = [];
  for (let i = 0; i < spaces.length; i++) {
    const space = spaces[i].space;
    _spaces.push(
      <div>
        <b>{space.name}</b> ({space.id}) - {space.members.length} members
      </div>
    );
  }
  return (
    <div>
      <h5>Joined Spaces</h5>
      {_spaces}
    </div>
  );
};

const MyEnsDomains = ({ ensDomains, existingSpaces, setSelectedDomain }) => {
  if (!ensDomains || !ensDomains.length) return;
  const newEnsDomainOptions = [];

  const existingSpacesCache = {};
  for (let i = 0; i < existingSpaces.length; i++) {
    existingSpacesCache[existingSpaces[i].id] = true;
  }

  for (let i = 0; i < ensDomains.length; i++) {
    const domain = ensDomains[i].name;
    if (!existingSpacesCache[domain]) newEnsDomainOptions.push({ label: domain, value: domain });
  }
  return (
    <div>
      <CreateSpace newEnsDomainOptions={newEnsDomainOptions} setSelectedDomain={setSelectedDomain} />
      <hr />
      <ExistingSpaces spaces={existingSpaces} />
    </div>
  );
};

const CreateSpace = ({ newEnsDomainOptions, setSelectedDomain }) => {
  if (!newEnsDomainOptions.length)
    return (
      <div>
        <button onClick={() => window.open(links.BUY_ENS_DOMAIN, "_blank").focus()}>Register New Domain</button>
      </div>
    );
  return (
    <div>
      <Dropdown options={newEnsDomainOptions} onChange={setSelectedDomain} />
      <input id={id.input.snapshot.ENS} placeholder="ENS" disabled={true} />
      <input id={id.input.snapshot.SPACE_NAME} placeholder="Space Name" />
      <input id={id.input.snapshot.SPACE_SYMBOL} placeholder="Space Symbol" />
      <button onClick={Snapshot.createSpace}>Create Space</button>
    </div>
  );
};

export default () => {
  const [ensDomains, setEnsDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState();
  const [existingSpaces, setExistingSpaces] = useState([]);
  const [followedSpaces, setFollowedSpaces] = useState([]);

  const handleSetEnsDomains = (domains) => {
    setEnsDomains(domains);
    Snapshot.getSpacesIn(
      domains.map((obj) => obj.name),
      setExistingSpaces
    );
  };

  useEffect(() => {
    Snapshot.getEnsDomainsByAccount(handleSetEnsDomains);
    Snapshot.getFollowedSpaces(setFollowedSpaces);
  }, []);

  return (
    <div>
      <MyEnsDomains ensDomains={ensDomains} setSelectedDomain={setSelectedDomain} existingSpaces={existingSpaces} />
      <JoinedSpaces spaces={followedSpaces} />
    </div>
  );
};
