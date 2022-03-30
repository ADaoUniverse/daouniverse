export default ({ createSafe }) => {
  return (
    <div>
      <textarea id="safe_owners" placeholder={"0x1123...\n0x2345...\n0x456E..."} />
      <br />
      <input id="safe_vote_threshold" type="number" />
      <br />
      <button onClick={createSafe}>Create Safe</button>
    </div>
  );
};
