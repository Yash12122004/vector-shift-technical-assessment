import { BaseNode } from './BaseNode';

export const APINode = ({ id }) => (
  <BaseNode
    id={id}
    title="API Request"
    handles={[
      { id: 'request', type: 'target' },
      { id: 'response', type: 'source' },
    ]}
  >
    <input placeholder="Endpoint URL" />
    <select>
      <option>GET</option>
      <option>POST</option>
    </select>
  </BaseNode>
);
