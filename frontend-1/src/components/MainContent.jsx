import PropTypes from 'prop-types';

const MainContent = ({ children }) => {
    return (
        <div className="main-content">
            {/* Render the children passed from MainWindow or Outlet from react-router */}
            {children}
        </div>
    );
};

MainContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainContent;
