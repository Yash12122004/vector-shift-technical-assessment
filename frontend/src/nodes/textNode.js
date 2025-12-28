import { useState, useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { useUpdateNodeInternals } from 'reactflow';

const DEFAULT_WIDTH_CH = 24;
const MAX_WIDTH_CH = 42;
const MAX_HEIGHT_PX = 200;

const extractVariables = (text) => {
  const regex = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;
  const vars = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return Array.from(vars);
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{in}');
  const textareaRef = useRef(null);

  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const onConnect = useStore((s) => s.onConnect);
  const setEdges = useStore((s) => s.setEdges);
  const updateNodeInternals = useUpdateNodeInternals();

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight + 10, MAX_HEIGHT_PX) + 'px';
  }, [text]);

  const longestLine = Math.max(
    ...text.split('\n').map((l) => l.length),
    0
  );
  const shouldGrowHorizontally = longestLine > DEFAULT_WIDTH_CH;
  const widthCh = Math.min(longestLine + 2, MAX_WIDTH_CH);

  const variables = useMemo(() => extractVariables(text), [text]);
  const variableHandles = variables.map((v) => ({
    id: v,
    type: 'target',
  }));

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);  

  useEffect(() => {
    const currentVarSet = new Set(variables);
    const edgesToRemove = edges.filter(
      (e) => {
        if (e.target !== id) return false;
        const handleVarName = e.targetHandle?.replace(`${id}-`, '');
        return !currentVarSet.has(handleVarName);
      }
    );

    if (edgesToRemove.length > 0) {
      setEdges(edges.filter(
        (e) => !edgesToRemove.some(rem => rem.id === e.id)
      ));
    }

    if (!variables.length) return;

    const inputMap = new Map();
    nodes.forEach((node) => {
      if (node.type === 'customInput') {
        const name = node.data?.inputName || node.id.replace('customInput-', 'input_');
        if (name && !inputMap.has(name)) {
          inputMap.set(name, node);
        }
      }
    });

    variables.forEach((varName) => {
      const inputNode = inputMap.get(varName);
      if (!inputNode) return;

      const sourceHandleId = `${inputNode.id}-value`;
      const targetHandleId = `${id}-${varName}`;

      const exists = edges.some(
        (e) =>
          e.source === inputNode.id &&
          e.sourceHandle === sourceHandleId &&
          e.target === id &&
          e.targetHandle === targetHandleId
      );

      if (!exists) {
        onConnect({
          source: inputNode.id,
          sourceHandle: "value",
          target: id,
          targetHandle: targetHandleId,
        });
        console.log('Connecting:', inputNode.id, 'to', id, 'via', varName);
      }
    });
  }, [variables, nodes, edges, id, onConnect, setEdges]);

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={[
        ...variableHandles,
        { id: 'output', type: 'source' },
      ]}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
        style={{
          width: shouldGrowHorizontally ? `${widthCh}ch` : '100%',
          maxWidth: `${MAX_WIDTH_CH}ch`,
          resize: 'none',
          overflowY: 'auto',
        }}
      />
    </BaseNode>
  );
};