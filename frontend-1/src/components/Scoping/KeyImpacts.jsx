import '../Styles/MainWindow.css';

const KeyImpacts = () => {
    return (
        <div className="sub-step-container">
            <h2 className="sub-step-header">Identification of Key Impacts</h2>
            <div className="sub-step-section">
                <h3>Key Environmental Impacts</h3>
                <p>
                    Identify the most significant environmental impacts based on stakeholder feedback, baseline data, and expert consultations.
                </p>
            </div>
            <div className="sub-step-section">
                <h3>Impact Matrix</h3>
                <p>
                    Develop a matrix listing potential impacts and their severity, likelihood, and required mitigation measures.
                </p>
                <button>View Matrix</button>
            </div>
        </div>
    );
};

export default KeyImpacts;
