import '../Styles/MainWindow.css';

const StakeholderConsultation = () => {
    return (
        <div className="sub-step-container">
            <h2 className="sub-step-header">Stakeholder Consultation</h2>
            <div className="sub-step-section">
                <h3>Overview</h3>
                <p>
                    Stakeholder consultation is a critical step in identifying key concerns from interested parties
                    and gathering input to ensure the EIA process is comprehensive and inclusive.
                </p>
            </div>
            <div className="sub-step-section">
                <h3>Consultation Plan</h3>
                <p>
                    Develop a detailed plan outlining the methods, timelines, and target stakeholders
                    to engage throughout the EIA process.
                </p>
                <button>Download Plan Template</button>
            </div>
            <div className="sub-step-section">
                <h3>Recorded Feedback</h3>
                <p>
                    After consultations, feedback must be analyzed and integrated into the impact assessment process.
                    Document the feedback and the actions taken.
                </p>
                <button>Submit Feedback</button>
            </div>
        </div>
    );
};

export default StakeholderConsultation;
