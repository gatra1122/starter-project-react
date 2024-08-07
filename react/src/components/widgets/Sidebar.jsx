import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    HomeIcon,
    TableCellsIcon,
  } from "@heroicons/react/24/solid";
  import { Link, useLocation } from "react-router-dom";
  import { useState } from "react";
   
  export function Sidebar() {
    let location = useLocation();
    return (
        <Card className="flex rounded-none h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="p-2">
                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="cursor-default"
                >
                    Menu
                </Typography>
                <hr />
            </div>
            <List>
                <Link to="/dashboard">
                    <ListItem
                        selected={
                            location.pathname == "/dashboard" ? true : false
                        }
                    >
                        <ListItemPrefix>
                            <HomeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>
                <Link to="/datacontoh">
                    <ListItem
                        selected={
                            location.pathname == "/datacontoh" ? true : false
                        }
                    >
                        <ListItemPrefix>
                            <TableCellsIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Data Contoh
                    </ListItem>
                </Link>
            </List>
        </Card>
    );
  }