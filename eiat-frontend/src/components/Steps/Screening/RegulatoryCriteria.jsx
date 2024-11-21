import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Select, Button, Text, Title, Paper, Loader } from '@mantine/core';

const RegulatoryCriteria = () => {
    
    //const { location } = useSelector((state) => state.user);
    const [regulations, setRegulations] = useState(null);
    const [loading, setLoading] = useState(false);
    {/*
    useEffect(() => {
        if (location) {
            setLoading(true);
            axios.get(`https://api.compliance-checker.com/regulations?country=${location}`)
                .then((response) => {
                    setRegulations(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching regulations:', error);
                    setLoading(false);
                });
        }
    }, [location]);

    if (loading) {
        return <Loader>Loading regulations...</Loader>
    }
    */}

    return (
        <Paper padding="md">
            <Title order={3}>Environmental Regulations for {location.country}</Title>
            {regulations ? (
                regulations.map((reg, index) => (
                    <Text key={index}>- {reg.description}</Text>
                ))
            ) : (
                <Text>No regulations available for this region.</Text>
            )}
        </Paper>
    );
}; 

export default RegulatoryCriteria;
