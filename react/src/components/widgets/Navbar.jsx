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
    Spinner
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
      <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
              <div className="capitalize">
                  {/* <nav aria-label="breadcrumb" className="w-max">
                      <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                          <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                              <a href="#/dashboard">
                                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                                      dashboard
                                  </p>
                              </a>
                              <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                                  /
                              </span>
                          </li>
                          <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                  home
                              </p>
                          </li>
                      </ol>
                  </nav> */}
                  <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
                      Web App
                  </h6>
              </div>
              <div className="flex items-center">
                  <span className="flex text-blue-gray-600 mr-2">
                      Selamat datang, {prop.name}{" "}
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
      </nav>
  );
}