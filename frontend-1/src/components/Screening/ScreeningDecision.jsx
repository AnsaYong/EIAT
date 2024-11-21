//import { useEffect, useState } from 'react';

const ScreeningDecision = () => {
    {/*
    const [decision, setDecision] = useState(null);

    useEffect(() => {
        // Placeholder: Fetch decision from backend
        fetch('/api/screening-decision')  // Placeholder URL
            .then(response => response.json())
            .then(data => setDecision(data))
            .catch(error => console.error('Error fetching decision:', error));
    }, []);
    */}

    const decision = {
        decision: 'Approved',
        justification: 'The project is expected to have minimal environmental impact.',
        conditions: [
            'The project must comply with all relevant environmental regulations.',
            'The project must not encroach on protected land.'
        ]
    };

    return (
        <div>
            <h2>Screening Decision</h2>
            {decision ? (
                <div>
                    <h3>Decision Summary:</h3>
                    <pre>{JSON.stringify(decision, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading decision...</p>
            )}
        </div>
    );
};

export default ScreeningDecision;
