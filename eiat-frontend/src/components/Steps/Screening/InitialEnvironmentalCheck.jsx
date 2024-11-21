import { useState } from 'react';
import { Checkbox, Group, Button, TextInput, Paper } from '@mantine/core';

const InitialEnvironmentalCheck = ({ onSubmit }) => {
    const [checks, setChecks] = useState({
        landUse: false,
        protectedAreas: false,
        waterBodies: false,
        airQuality: false,
    });

    const handleChange = (e) => {
        setChecks({ ...checks, [e.target.name]: e.target.checked });
    };

    const handleSubmit = () => {
        onSubmit(checks);
    };

    return (
        <Paper padding="md">
            <Group direction="column" spacing="sm">
                <Checkbox
                    label="Land Use Conflicts"
                    name="landUse"
                    checked={checks.landUse}
                    onChange={handleChange}
                />
                <Checkbox
                    label="Near Protected Areas"
                    name="protectedAreas"
                    checked={checks.protectedAreas}
                    onChange={handleChange}
                />
                <Checkbox
                    label="Water Bodies Nearby"
                    name="waterBodies"
                    checked={checks.waterBodies}
                    onChange={handleChange}
                />
                <Checkbox
                    label="Potential Air Quality Issues"
                    name="airQuality"
                    checked={checks.airQuality}
                    onChange={handleChange}
                />
                <Button onClick={handleSubmit}>Save and Continue</Button>
            </Group>
        </Paper>
    );
};

export default InitialEnvironmentalCheck;