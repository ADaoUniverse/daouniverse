import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

import { supportedNetworks, gnosis, appName } from "../../Constants";
import DataBridge from "../../helpers/DataBridge";


const handleChange = (selected) => {
  window[appName].databridge.pub(DataBridge.TOPIC.REQUEST_NETWORK_CHANGE, selected.value);
};

export default () => {
  if (gnosis.baseapi[window[appName].network.chainId]) return <></>;
  return (
    <div className="networkNotSupported">
      <div>Network Not Supported. Please select one of the supported networks.</div>
      <Dropdown options={supportedNetworks} onChange={handleChange} />
    </div>
  );
};
