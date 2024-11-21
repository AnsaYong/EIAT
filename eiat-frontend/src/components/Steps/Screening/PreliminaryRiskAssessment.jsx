// PreliminaryRiskAssessment
// Helps identify potential risks (e.g., pollution, waste generation)
// that might arise during the project.
import { useState } from 'react';
import { MultiSelect, Textarea, Button, Paper } from '@mantine/core';
import PropTypes from 'prop-types';

const PreliminaryRiskAssessment = ({ onSubmit }) => {
    const [risks, setRisks] = useState([]);
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        onSubmit({ risks, notes });
    };

    return (
        <Paper padding="md">
            <MultiSelect
                label="Potential Risks"
                placeholder="Select potential risks"
                data={[
                    { value: 'soil-contamination', label: 'Soil Contamination' },
                    { value: 'water-pollution', label: 'Water Pollution' },
                    { value: 'air-pollution', label: 'Air Pollution' },
                    { value: 'waste-generation', label: 'Waste Generation' },
                ]}
                value={risks}
                onChange={setRisks}
                searchable
                required
            />
            <Textarea
                label="Additional Notes on Risks"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                minRows={4}
            />
            <Button onClick={handleSubmit} mt="md">Save and Continue</Button>
        </Paper>
    );
};

PreliminaryRiskAssessment.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default PreliminaryRiskAssessment;
