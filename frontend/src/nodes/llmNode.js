import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => (
  <BaseNode
    id={id}
    title="LLM"
    description="This is a LLM."
    handles={[
      { id: 'system', type: 'target' },
      { id: 'prompt', type: 'target' },
      { id: 'response', type: 'source' },
    ]}
  />
);
