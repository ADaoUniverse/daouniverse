import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default ({ safes, selected, selectSafe }) => {
  if (!safes || safes.length == 0) return;
  const options = [];
  for (let i = 0; i < safes.length; i++) {
    options.push({ label: safes[i], value: safes[i] });
  }
  return <Dropdown options={options} value={selected} onChange={selectSafe} />;
};
