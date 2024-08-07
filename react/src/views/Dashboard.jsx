import {usePageContext} from "../context/ContextPage.jsx";
import { useEffect } from "react";
export default function Dashboard() {
    const {title,setTitle,bread,setBread} = usePageContext();
    const breadcrumList = [
        {
            name: "Dashboard",
            url: "#",
        },
    ];

    useEffect(() => {
        setTitle('Dashboard')
        setBread(breadcrumList)
      }, [])
    

  return (
    <div className="animate-fade-down animate-duration-200">
        <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </span>
      </div>
  );
}
