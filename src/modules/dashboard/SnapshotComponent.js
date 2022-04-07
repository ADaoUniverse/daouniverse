import React from "react";
import CreateSpace from "../../components/dashboard/snapshot/CreateSpace";

class SnapshotComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Snapshot</h1>
        <CreateSpace />
      </div>
    );
  }
}

export default SnapshotComponent;
