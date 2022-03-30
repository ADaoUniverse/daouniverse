import Theme from "./Theme";

import Logo from "../res/logo.svg";

export default () => {
  return (
    <div className="navbar">
      <img className="navitem navitem-logo" src={Logo} />
      <div className="navitem">
        <button>Login</button>
        <Theme />
      </div>
    </div>
  );
};
