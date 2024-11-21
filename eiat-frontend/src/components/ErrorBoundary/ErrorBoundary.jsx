import React from 'react';
import PropTypes from 'prop-types';

// ErrorBoundary component class
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    // This lifecycle method is called when an error occurs
    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI
        return { hasError: true, error };
    }

    // Log error information
    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service here
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({ errorInfo });
    }

    // Reset the error boundary to try rendering again (optional)
    resetError = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        const { hasError, error, errorInfo } = this.state;
        const { fallback, children } = this.props;

        if (hasError) {
            // Render custom fallback UI if provided, else show default
            if (fallback) {
                return fallback({ error, errorInfo, resetError: this.resetError });
            }

            // Default fallback UI
            return (
                <div style={{ padding: '20px', background: '#f8d7da', color: '#721c24' }}>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {error && error.toString()}
                        <br />
                        {errorInfo?.componentStack}
                    </details>
                    <button onClick={this.resetError}>Try Again</button>
                </div>
            );
        }

        // Render children if no error occurred
        return children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.func,  // Optional fallback renderer
};

export default ErrorBoundary;
