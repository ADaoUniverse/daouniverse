import React from "react";

import Navbar from "../components/Navbar";
import Login from "./Login";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar />
        <Login />
      </div>
    );
  }
}

export default Main;
