import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  description,
  handles = [],
  children,
}) => {
  const leftHandles = handles.filter(h => h.type === 'target');
  const rightHandles = handles.filter(h => h.type === 'source');

  const renderHandles = (list, position) =>
    list.map((h, index) => {
      const top = `${((index + 1) * 100) / (list.length + 1)}%`;

      return (
        <Handle
          key={h.id}
          id={`${id}-${h.id}`}
          type={h.type}
          position={position}
          style={{ top }}
        />
      );
    });

  return (
    <div className='node'>
      {renderHandles(leftHandles, Position.Left)}

      <div className='node-title'>
        <strong>{title}</strong>
      </div>

      {description && <div>{description}</div>}
      {children}
      
      {renderHandles(rightHandles, Position.Right)}
    </div>
  );
};
