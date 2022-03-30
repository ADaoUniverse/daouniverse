import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Start Your DAO Here</h1>
        <h5>
          Dao Universe simplifies your organization accounting and decision making to help you focus in what matters the
          most.
        </h5>
        <button>Open Account</button>
        <h5>
          <b>Powered By </b><img src="https://coinshift.xyz/static/gnosis-icon-2140c8af21b8b47bf12a77e95017df1d.svg" />
        </h5>
      </div>
    );
  }
}

export default Login;
