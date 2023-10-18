import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { MouseEvent, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (evt: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="md:hidden ml-2">
      <IconButton onClick={handleOpen} aria-label="icon-menu-bar">
        <AiOutlineMenu className={`text-white w-6 h-6`} />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem>Home</MenuItem>
        <MenuItem>Movies</MenuItem>
        <MenuItem>TV shows</MenuItem>
        <MenuItem>New</MenuItem>
        <MenuItem>Popular</MenuItem>
      </Menu>
    </div>
  );
};

export default NavMenu;
