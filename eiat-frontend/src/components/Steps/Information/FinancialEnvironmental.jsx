// 
import { Card, Text } from '@mantine/core';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';


const FinancialEnvironmental = () => {
    const selectedProject = useSelector((state) => state.projects.selectedProject);
    console.log('Current project from the Financial & Environmental tab:', selectedProject.name);

    const budgetData = useMemo(() => ({
        labels: ['Spent', 'Remaining'],
        datasets: [{
            data: [selectedProject.spent_budget, selectedProject.budget_estimate - selectedProject.spent_budget],
            backgroundColor: ['#3498db', '#ecf0f1'],
        }],
    }), [selectedProject]);

    return (
        <div>
            <Card>
                <Text>Budget: {selectedProject.budget_estimate}</Text>
                <Doughnut data={budgetData} />
            </Card>
            <Card>
                <Text>Primary Environmental Concern: {selectedProject.primary_environmental_concern}</Text>
            </Card>
        </div>
    );
};

export default FinancialEnvironmental;
