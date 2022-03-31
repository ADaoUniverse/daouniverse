import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { supportedNetworks, appName } from "../../Constants";
import DataBridge from "../../helpers/DataBridge";

const handleChange = (selected) => {
  window[appName].databridge.pub(DataBridge.TOPIC.REQUEST_NETWORK_CHANGE, selected.value);
};

export default ({ className }) => {
  if (!window[appName].network) return;
  if (supportedNetworks.supported.indexOf(window[appName].network.chainId) > -1) return <></>;
  return (
    <div className={`networkNotSupported ${className}`}>
      <div>Network Not Supported. Please select one of the supported networks.</div>
      <Dropdown options={supportedNetworks.options} onChange={handleChange} />
    </div>
  );
};
