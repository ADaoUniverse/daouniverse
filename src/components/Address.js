import { appName, chainexplorer } from "../Constants";
import HoverTooltip from "./HoverTooltip";

export default ({ first, second, a }) => {
  const _address = a.substr(0, first || 5) + "…" + a.substr(second || -4);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(a);
  };
  const openLink = () => {
    window.open(chainexplorer[window[appName].network.chainId](a), "_blank").focus();
  };
  return (
    <HoverTooltip
      tools={[
        <img className="tool" src="/icons/copy.svg" onClick={copyToClipboard} />,
        <img className="tool" src="/icons/external-link.svg" onClick={openLink} />,
      ]}
    >
      {_address}
    </HoverTooltip>
  );
};
