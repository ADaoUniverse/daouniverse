import Address from "../Address";

export default ({ safeDetails }) => {
  if (!safeDetails) return;
  const owners = [];
  for (let i = 0; i < safeDetails.owners.length; i++) {
    owners.push(
      <div>
        <Address address={safeDetails.owners[i]}></Address>
      </div>
    );
  }
  return <div>owners:{owners}</div>;
};
