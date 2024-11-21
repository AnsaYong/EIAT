import PropTypes from 'prop-types';


export function ProjectLaunch({ opened, onClose }) {
    if (!opened) return null; // Do not render if not opened

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                }}
            >
                <h2>Welcome</h2>
                <p>Please choose an option:</p>
                <button onClick={() => { /* Logic to load existing project */ }}>Load Existing Project</button>
                <button onClick={() => { /* Logic to start new project */ }}>Start New Project</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

ProjectLaunch.propTypes = {
    opened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};