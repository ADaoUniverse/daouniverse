import { appName, id, links } from "../../../Constants";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import HoverTooltip from "../../../components/HoverTooltip";

import Snapshot from "../../../helpers/snapshot/Snapshot";
import Modal from "../../Modal";
import DataBridge from "../../../helpers/DataBridge";

const Proposal = ({ proposal }) => {
  const [voteOption, setVoteOption] = useState();
  const vote = async () => {
    const res = await Snapshot.voteProposal(proposal, voteOption.value);
    alert("Vote recorded");
  };
  const voteOptions = proposal.choices.map((c, i) => {
    return { label: c, value: i };
  });

  let isVotingDisabled = true;
  let message = undefined;
  let winner = undefined;
  switch (proposal.state.toLowerCase()) {
    case "pending":
      message = `voting starts at ${new Date(proposal.start * 1000)}`;
      break;
    case "active":
      message = `voting ends at ${new Date(proposal.end * 1000)}`;
      isVotingDisabled = false;
      break;
    case "closed":
      message = `voting ended at ${new Date(proposal.end * 1000)}`;
      winner = {
        score: -1,
        index: -1,
      };
      for (let i = 0; i < proposal.scores_by_strategy.length; i++) {
        const _score = proposal.scores_by_strategy[i].reduce((a, b) => a + b);
        if (_score > winner.score) {
          winner.score = _score;
          winner.index = i;
          winner.option = voteOptions[winner.index];
        }
      }
      break;
  }

  return (
    <div>
      <div>
        <h4>
          {proposal.title} [{proposal.state}] {winner ? `[${winner.option.label}]` : ""}
        </h4>
      </div>
      <Dropdown
        options={voteOptions}
        value={winner ? winner.option : voteOption}
        onChange={setVoteOption}
        disabled={isVotingDisabled}
      />
      <button onClick={vote} disabled={isVotingDisabled}>
        Vote
      </button>
      *{message}
    </div>
  );
};

const ViewProposals = ({ space }) => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    Snapshot.getProposals(space, setProposals);
  }, []);

  return (
    <div>
      <h4>
        Latest Proposals In {space.name} ({space.id})
      </h4>
      {proposals.map((p) => (
        <Proposal proposal={p} />
      ))}
    </div>
  );
};

const CreateProposal = ({ space }) => {
  const [options, setOptions] = useState([]);

  const addOption = () => {
    const optionInput = document.getElementById(id.input.snapshot.PROPOSAL_OPTION);
    const option = optionInput.value;
    if (!option) return alert("please enter option to add");
    setOptions([...options, option]);
    optionInput.value = "";
    optionInput.focus();
  };

  const createProposal = async () => {
    const title = document.getElementById(id.input.snapshot.PROPOSAL_TITLE).value;
    if (!title) return alert("title required");
    if (!options.length) return alert("options required");

    const res = await Snapshot.createProposal(space, title, options);
    alert("Proposal Created");
  };

  return (
    <div>
      <div>
        <h4>
          Create Proposal in {space.name} ({space.id})
        </h4>
      </div>
      <input id={id.input.snapshot.PROPOSAL_TITLE} placeholder="title" />
      <br />
      {options.map((o) => (
        <div>
          <input value={o} disabled={true} />
          <br />
        </div>
      ))}
      <input id={id.input.snapshot.PROPOSAL_OPTION} placeholder="option" />
      <button onClick={addOption}>Add</button>
      <br />
      <button onClick={createProposal}>Create Proposal</button>
    </div>
  );
};

const Space = ({ space, isJoined }) => {
  const viewProposals = () => {
    window[appName].databridge.pub(
      DataBridge.TOPIC.OPEN_MODAL(id.modal.space.CREATE_PROPOSAL),
      <ViewProposals space={space} />
    );
  };
  const createProposal = () => {
    window[appName].databridge.pub(
      DataBridge.TOPIC.OPEN_MODAL(id.modal.space.CREATE_PROPOSAL),
      <CreateProposal space={space} />
    );
  };
  const joinSpace = async () => {
    await Snapshot.joinSpace(space);
    alert("Space joined");
  };
  const leaveSpace = async () => {
    await Snapshot.leaveSpace(space);
    alert("Space left");
  };
  const deleteSpace = () => {
    alert("delete Space");
  };
  const isAdmin = space.admins.indexOf(window[appName].account) > -1;

  const tools = [
    <img className="tool" src="/icons/view.svg" onClick={viewProposals} />,
    <img className="tool" src="/icons/create-proposal.svg" onClick={createProposal} />,
  ];

  if (isJoined) {
    tools.push(<img className="tool" src="/icons/exit.svg" onClick={leaveSpace} />);
  } else {
    tools.push(<img className="tool" src="/icons/join.svg" onClick={joinSpace} />);
  }

  if (isAdmin) {
    tools.push(<img className="tool" src="/icons/delete.svg" onClick={deleteSpace} />);
  }

  return (
    <div>
      <HoverTooltip tools={tools}>
        <b>{space.name}</b> ({space.id}) - {space.members.length} members
      </HoverTooltip>
    </div>
  );
};

const ExistingSpaces = ({ spaces }) => {
  const _spaces = [];
  for (let i = 0; i < spaces.length; i++) {
    const space = spaces[i];
    _spaces.push(<Space space={space} isJoined={false} />);
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
    _spaces.push(<Space space={space} isJoined={true} />);
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
      <Modal id={id.modal.space.CREATE_PROPOSAL}></Modal>
    </div>
  );
};
