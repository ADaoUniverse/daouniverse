import HoverTooltip from "./HoverTooltip";

export default ({ first, second, address }) => {
  const _address = address.substr(0, first || 5) + "…" + address.substr(second || -4);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };
  const openLink = () => {
    window.open(`https://etherscan.io/address/${address}`, "_blank").focus();
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
