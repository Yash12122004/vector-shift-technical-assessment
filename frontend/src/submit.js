// submit.js
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges,
        }),
      });

      const data = await response.json();

      alert(
        `Pipeline Analysis\n\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? 'Yes' : 'No'}`
      );
    } catch (err) {
      alert('Failed to analyze pipeline');
      console.error(err);
    }
  };

  return (
    <div className="submit-bar">
      <button className="submit-btn" onClick={handleSubmit}>
        Run Pipeline
      </button>
    </div>
  );
};
