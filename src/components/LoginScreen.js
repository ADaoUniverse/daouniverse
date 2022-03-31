import Loader from "./Loader";
import NetworkNotSupported from "./dashboard/NetworkNotSupported";

export default () => {
  return (
    <div className="login">
      <NetworkNotSupported className="floating" />
      <div className="connecting">
        <Loader />
        <div className="caption">Connecting...</div>
      </div>
    </div>
  );
};
