import HoverTooltip from "./HoverTooltip";

export default ({ first, second, children }) => {
  const _address = children.substr(0, first || 5) + "…" + children.substr(second || -4);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
  };
  const openLink = () => {
    window.open(`https://etherscan.io/address/${children}`, "_blank").focus();
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
