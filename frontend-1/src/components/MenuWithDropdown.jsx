import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

const MenuWithDropdown = ({ menuItem }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <button className="menu-item" onClick={handleMenuOpen}>
                {menuItem.label}
            </button>
            {menuItem.subMenu && (
                <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                >
                    {menuItem.subMenu.map((subItem, index) => (
                        <MenuItem key={index} onClick={subItem.action}>
                            {subItem.label}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </>
    );
};
MenuWithDropdown.propTypes = {
    menuItem: PropTypes.shape({
        label: PropTypes.string.isRequired,
        subMenu: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                action: PropTypes.func.isRequired,
            })
        ),
    }).isRequired,
};

export default MenuWithDropdown;
