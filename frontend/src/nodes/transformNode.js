import { BaseNode } from './BaseNode';

export const TransformNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Transform"
    handles={[
      { id: 'input', type: 'target' },
      { id: 'output', type: 'source' },
    ]}
  >
    <select>
      <option>Uppercase</option>
      <option>Lowercase</option>
      <option>Trim</option>
    </select>
  </BaseNode>
);
