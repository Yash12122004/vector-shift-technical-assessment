import { BaseNode } from './BaseNode';

export const MathNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Math"
    description="Add numbers"
    handles={[
      { id: 'a', type: 'target' },
      { id: 'b', type: 'target' },
      { id: 'c', type: 'target' },
      { id: 'result', type: 'source' },
    ]}
  />
);
