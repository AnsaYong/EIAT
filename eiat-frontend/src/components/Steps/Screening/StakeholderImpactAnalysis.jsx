// Stakeholder Impact Analysis
// gathers information on the potential impact on stakeholders,
// such as nearby communities or ecosystems
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Textarea, Button, Paper } from '@mantine/core';

const StakeholderImpactAnalysis = ({ onSubmit }) => {
    const [impacts, setImpacts] = useState({
        communitiesAffected: false,
        wildlifeDisruption: false,
        culturalHeritage: false,
        additionalNotes: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setImpacts({
            ...impacts,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = () => {
        onSubmit(impacts);
    };

    return (
        <Paper padding="md">
            <Checkbox
                label="Impact on Local Communities"
                name="communitiesAffected"
                checked={impacts.communitiesAffected}
                onChange={handleChange}
            />
            <Checkbox
                label="Disruption to Wildlife"
                name="wildlifeDisruption"
                checked={impacts.wildlifeDisruption}
                onChange={handleChange}
            />
            <Checkbox
                label="Effect on Cultural Heritage"
                name="culturalHeritage"
                checked={impacts.culturalHeritage}
                onChange={handleChange}
            />
            <Textarea
                label="Additional Notes"
                name="additionalNotes"
                value={impacts.additionalNotes}
                onChange={handleChange}
                minRows={4}
            />
            <Button onClick={handleSubmit} mt="md">Save and Continue</Button>
        </Paper>
    );
};

StakeholderImpactAnalysis.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default StakeholderImpactAnalysis;
