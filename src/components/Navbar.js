import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

const Navbar = ({ onMenuChanged, activeItem }) => {
    const menuChanged = e => {
        onMenuChanged(e.target.innerText.toLowerCase());
    };

    return (
        <Menu style={{ borderRadius: 0 }} inverted>
            <Menu.Item header>Extreme Coding Daily</Menu.Item>

            <Menu.Item name="posts" active={activeItem === "posts"} onClick={menuChanged} />
            <Menu.Item name="help" active={activeItem === "help"} onClick={menuChanged} />
        </Menu>
    );
};

Navbar.propTypes = {
    activeItem: PropTypes.string.isRequired,
    onMenuChanged: PropTypes.func.isRequired
};

export default Navbar;
