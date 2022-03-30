import Loader from "./Loader";

export default () => {
  return (
    <div className="login">
      <Loader />
      <div className="caption">Connecting...</div>
    </div>
  );
};
