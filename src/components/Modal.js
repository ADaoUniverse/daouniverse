import { useState } from "react";
import Modal from "react-modal";

import { appName } from "../Constants";
import DataBridge from "../helpers/DataBridge";

export default ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState();

  const handleOpen = (_children) => {
    setChildren(_children);
    setIsOpen(true);
  };

  const handleClose = () => {
    setChildren(undefined);
    setIsOpen(false);
  };

  window[appName].databridge.sub(DataBridge.TOPIC.OPEN_MODAL(id), handleOpen);
  window[appName].databridge.sub(DataBridge.TOPIC.CLOSE_MODAL(id), handleClose);

  return (
    <div>
      <Modal isOpen={isOpen}>
        <button onClick={handleClose}>Close</button>
        {children}
      </Modal>
    </div>
  );
};
