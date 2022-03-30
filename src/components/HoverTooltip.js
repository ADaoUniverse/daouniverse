export default ({ children, tools, dragOptions = {}, className, style }) => {
  return (
    <div
      className={`hover-tools-container table ${className}`}
      style={style}
      draggable={dragOptions.draggable}
      onDragStart={dragOptions.onDragStart}
      onDragEnd={dragOptions.onDragEnd}
      onDragOverCapture={dragOptions.onDragOverCapture}
    >
      {children}
      <div className="tool-container">{tools}</div>
    </div>
  );
};
