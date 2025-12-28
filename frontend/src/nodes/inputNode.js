import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [type, setType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      handles={[
        { id: 'value', type: 'source' },
      ]}
    >
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Type:
        <br />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
