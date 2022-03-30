import { useState } from "react";

export default ({ onChange }) => {
  const [on, setOn] = useState(false);
  const toggleOn = () => {
    setOn(!on);
    onChange(!on);
  };
  return (
    <div className={`toggleContainer`} onClick={toggleOn}>
      <div className={`toggleSwitch  ${on ? "on" : "off"}`}></div>
    </div>
  );
};
