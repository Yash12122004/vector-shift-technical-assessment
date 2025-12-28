import { useStore } from './store';
import Swal from 'sweetalert2';

export const SubmitButton = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();

      Swal.fire({
        title: 'Pipeline Analysis',
        icon: data.is_dag ? 'success' : 'warning',
        html: `
          <div style="font-size:14px; line-height:1.6">
            <div><strong>Nodes:</strong> ${data.num_nodes}</div>
            <div><strong>Edges:</strong> ${data.num_edges}</div>
            <div>
              <strong>Status:</strong>
              ${data.is_dag ? 'Valid DAG' : 'Cycle Detected'}
            </div>
          </div>
        `,
        confirmButtonText: 'Done',
      });
      
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to analyze pipeline',
        icon: 'error',
      });
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
