import React from "react";
import CreateToken from "../../components/dashboard/token/CreateToken";
import UserTokens from "../../components/dashboard/token/UserTokens";
import { appName } from "../../Constants";
import DataBridge from "../../helpers/DataBridge";

class DaoERC20 extends React.Component {
  constructor(props) {
    super(props);
    this.handleTokenCreation = this.handleTokenCreation.bind(this);
  }

  componentDidMount() {
    window[appName].databridge.sub(DataBridge.TOPIC.TOKEN_CREATED, () => this.handleTokenCreation);
  }

  handleTokenCreation() {
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <UserTokens owner={this.props.currentSafe} />
        <CreateToken createToken={this.props.createToken} />
      </div>
    );
  }
}

export default DaoERC20;
