import React from "react";

class Tabbed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: this.props.currentTab || 0,
      //   tabs: [
      //     { title: "Request Accounts", content: <RequestAccountStatement /> },
      //     { title: "Change Password", content: <ChangePassword /> },
      //     { title: "Logout", content: <Logout/> },
      //   ],
      tabs: props.tabs || [],
    };
  }

  renderTabs() {
    const tabs = [];
    for (let i = 0; i < this.state.tabs.length; i++) {
      tabs.push(
        <div
          className={`tab ${this.state.currentTab == i ? "active" : ""}`}
          onClick={() => this.setState({ currentTab: i })}
        >
          {this.state.tabs[i].title}
        </div>
      );
    }
    return <div className="side-panel">{tabs}</div>;
  }

  render() {
    return (
      <div className="tabbed-container">
        {this.renderTabs()}
        <div className="content">{this.state.tabs[this.state.currentTab].content}</div>
      </div>
    );
  }
}

export default Tabbed;
