import { BaseNode } from './BaseNode';

export const SplitNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Split"
    handles={[
      { id: 'in', type: 'target' },
      { id: 'out1', type: 'source' },
      { id: 'out2', type: 'source' },
      { id: 'out3', type: 'source' },
    ]}
  />
);
