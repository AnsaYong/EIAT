// Project Scoping information
// Helps users specify the nature of their project,
// including type, duration, and key activities
import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Select, Textarea, Button, Paper } from '@mantine/core';

const ProjectScopeDefinition = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        projectType: '',
        duration: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Paper padding="md">
            <Select
                label="Project Type"
                name="projectType"
                value={formData.projectType}
                onChange={(value) => setFormData({ ...formData, projectType: value })}
                data={[
                    { value: 'construction', label: 'Construction' },
                    { value: 'mining', label: 'Mining' },
                    { value: 'agriculture', label: 'Agriculture' },
                    { value: 'energy', label: 'Energy' },
                ]}
                required
            />
            <TextInput
                label="Estimated Duration (in months)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
            />
            <Textarea
                label="Brief Description of Activities"
                name="description"
                value={formData.description}
                onChange={handleChange}
                minRows={4}
                required
            />
            <Button onClick={handleSubmit} mt="md">Save and Continue</Button>
        </Paper>
    );
};
ProjectScopeDefinition.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ProjectScopeDefinition;
