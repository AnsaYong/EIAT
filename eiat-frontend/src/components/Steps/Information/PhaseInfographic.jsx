// PhaseInfographic.jsx: 
import { RingProgress, Tooltip } from '@mantine/core';
import { useSelector } from 'react-redux';

const PhaseInfographic = () => {
    const selectedProject = useSelector((state) => state.projects.selectedProject);

    const steps = [
        { name: 'Screening', data: selectedProject.screening_results },
        { name: 'Scoping', data: selectedProject.scoping_result },
        { name: 'Impact Assessment', data: selectedProject.impact_assessment_results },
        // Add additional steps as needed
    ];

    return (
        <div className="infographic">
            {steps.map((step) => (
                <Tooltip key={step.name} label={step.name} withArrow>
                    <RingProgress
                        size={100} // Size of the ring
                        thickness={10} // Ring thickness
                        roundCaps
                        sections={[
                            {
                                value: step.data ? 100 : 0,
                                color: step.data ? 'teal' : 'gray',
                                tooltip: step.name,
                            },
                        ]}
                        label={<div style={{ fontSize: '12px', fontWeight: 'bold' }}>{step.name}</div>}
                    />
                </Tooltip>
            ))}
        </div>
    );
};

export default PhaseInfographic;