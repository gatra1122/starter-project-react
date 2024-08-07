import { useStateContext } from "../../context/ContextProvider";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon,
  } from "@heroicons/react/24/solid";

export default function Navbar(prop) {
    const {setUser,setToken} = useStateContext();
    // useEffect(() => {

    //   }, [])

    const onLogout = ev => {
        ev.preventDefault()
    
        // axiosClient.post('/logout')
        //   .then(() => {
        //     setUser({})
        //     setToken(null)
        //   })
        alert('test');
      }

    const profileMenuItems = [
        {
          label: "My Profile",
          icon: UserCircleIcon,
        },
        {
          label: "Edit Profile",
          icon: Cog6ToothIcon,
        },
        {
          label: "Inbox",
          icon: InboxArrowDownIcon,
        },
        {
          label: "Help",
          icon: LifebuoyIcon,
        },
        {
          label: "Sign Out",
          icon: PowerIcon,
          href:'/test',
        },
      ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
 
    const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav class="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
        <div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div class="capitalize">
                <nav aria-label="breadcrumb" class="w-max">
                    <ol class="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                        <li class="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                            <a href="#/dashboard">
                                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                            </a><span class="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span></li>
                        <li class="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">home</p>
                        </li>
                    </ol>
                </nav>
                <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">home</h6></div>
            <div class="flex items-center">
                    <span className="flex text-blue-gray-600 mr-2">Selamat datang, {prop.name} {prop.memuat && <Spinner className="h-5 w-5"></Spinner>}</span>
                <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
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
                        {profileMenuItems.map(({ label, icon }, key) => {
                        const isLastItem = key === profileMenuItems.length - 1;
                        return (
                            <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                            }`}
                            >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                            </MenuItem>
                        );
                        })}
                    </MenuList>
                </Menu>
            </div>
        </div>
    </nav>
  );
}