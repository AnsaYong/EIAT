import { useState } from 'react';

const ImpactPrediction = () => {
    const [impact, setImpact] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder: Send impact data to backend
        console.log({ impact });
    };

    return (
        <div>
            <h2>Impact Prediction</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Potential Environmental Impact:
                    <input
                        type="text"
                        value={impact}
                        onChange={(e) => setImpact(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ImpactPrediction;
