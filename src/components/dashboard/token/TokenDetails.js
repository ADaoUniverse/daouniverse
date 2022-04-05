import { ethers } from "ethers";
import React from "react";
import daoErc20Abi from "../../../abi/token/DaoERC20.json";
import { appName } from "../../../Constants";
import Address from "../../Address";

class TokenDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: new ethers.Contract(this.props.address, daoErc20Abi, window[appName].wallet),
    };

    this.getTokenDetails = this.getTokenDetails.bind(this);
  }

  componentDidMount() {
    this.getTokenDetails();
  }

  async getTokenDetails() {
    const token = this.state.contract;
    const name = (await token.name()).toString();
    const decimals = parseInt((await token.decimals()).toString());
    const symbol = (await token.symbol()).toString();
    const totalSupply = (await token.totalSupply()).toString();
    const balance = (await token.balanceOf(this.props.owner)).toString();

    this.setState({ name, symbol, decimals, totalSupply: totalSupply.toString(), balance });
  }

  render() {
    return (
      <div>
        <b>{this.state.symbol}</b> ({this.state.balance}/{this.state.totalSupply}){" "}
        <b>
          <Address a={this.props.address} />
        </b>
      </div>
    );
  }
}

export default TokenDetails;
