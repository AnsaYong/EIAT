import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const DataVisualization = ({ project }) => {
    const data = {
        labels: ['Impact A', 'Impact B', 'Impact C'],
        datasets: [
            {
                label: 'Impact Assessment',
                data: [12, 19, 3],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="data-visualization">
            <h3>Data Visualization for {project.name}</h3>
            <Bar data={data} />
        </div>
    );
};

DataVisualization.propTypes = {
    project: PropTypes.object.isRequired,
};

export default DataVisualization;
