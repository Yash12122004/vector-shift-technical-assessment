import { BaseNode } from './BaseNode';


export const MemoryNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Memory"
    handles={[
      { id: 'write', type: 'target' },
      { id: 'read', type: 'source' },
    ]}
  >
    <input placeholder="Memory key" />
  </BaseNode>
);
