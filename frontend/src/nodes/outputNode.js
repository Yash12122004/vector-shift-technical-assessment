import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [type, setType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={[
        { id: 'value', type: 'target' },
      ]}
    >
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
