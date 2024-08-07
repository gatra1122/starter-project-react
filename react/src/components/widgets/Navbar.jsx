import { useStateContext } from "../../context/ContextProvider.jsx";
import React, { useState } from "react";
import axiosClient from "../../axios-client.js";
import {
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Spinner,
    Navbar as MTNav
  } from "@material-tailwind/react";
  import {
    ArrowLeftStartOnRectangleIcon,
    ChevronDownIcon,
  } from "@heroicons/react/24/outline";

export default function Navbar(prop) {
    const {setUser,setToken, bilah,setBilah} = useStateContext();

    const onLogout = ev => {
        ev.preventDefault()
        axiosClient.post('/logout')
          .then(() => {
            setUser({})
            setToken(null)
          })
      }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    
  return (
    <MTNav className="top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
    <div className="flex items-center justify-between text-blue-gray-900">
      <span className="hover:opacity-60 hover:ease-out hover:duration-200 text-2xl cursor-default">Sistem Aplikasi</span>
        <div className="flex items-center">
            <span className="flex text-blue-gray-600 mr-2 cursor-default">
                Hallo, {prop.name}{" "}
                {prop.memuat && <Spinner className="h-5 w-5"></Spinner>}
            </span>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement="bottom-end"
            >
                <MenuHandler>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto bg-blue-gray-50"
                    >
                        <Avatar
                            variant="circular"
                            size="sm"
                            alt="tania andrew"
                            className="border border-gray-900 p-0.5"
                            src="public/vite.svg"
                        />
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3 w-3 transition-transform ${
                                isMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className="p-1">
                    <MenuItem
                        onClick={onLogout}
                        className="flex items-center gap-2 "
                    >
                        <ArrowLeftStartOnRectangleIcon className="w-4 mr-1"></ArrowLeftStartOnRectangleIcon>
                        <Typography
                            variant="small"
                            className="font-medium"
                        >
                            Sign Out
                        </Typography>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    </div>
</MTNav>

  );
}