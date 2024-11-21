// FooterBar.jsx to show status like autosave, current user, notifications

import './Styles/FooterBar.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

const FooterBar = ({ status, user, notifications }) => {
    return (
        <div className="footer-bar">
            <div className="status-section">
                <Tooltip title="Autosave Status" placement="top">
                    <CheckCircleIcon className="status-icon" />
                </Tooltip>
                <span>{status}</span>
            </div>

            <div className="user-section">
                <span>User: {user}</span>
            </div>

            <div className="notification-section">
                <Tooltip title="Notifications" placement="top">
                    <NotificationsIcon className="notification-icon" />
                </Tooltip>
                <span>{notifications} New notifications</span>
            </div>
        </div>
    );
};
FooterBar.propTypes = {
    status: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    notifications: PropTypes.string.isRequired,
};

export default FooterBar;