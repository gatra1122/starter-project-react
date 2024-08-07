import { Navigate, Outlet } from "react-router-dom"
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {useEffect,useState} from "react";
import { Sidebar } from './widgets/Sidebar.jsx';
import { Footer } from './widgets/Footer.jsx';
import Navbar from './widgets/Navbar.jsx';
import { SidebarWithBurgerMenu } from "./widgets/SidebarWithBurgerMenu.jsx";

export default function DefaultLayout(){
  const [isLoading, setIsLoading] = useState(false);
  const {user,token,setUser,setToken} = useStateContext();
  const test2 = SidebarWithBurgerMenu;

  useEffect(() => {
    setIsLoading(true)
    axiosClient.get('/user')
      .then(({data}) => {
        setIsLoading(false)
         setUser(data)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  if (!token) {
    return <Navigate to="/masuk"/>
  }
    return (
      <div className="bg-blue-gray-50/50">
        <div className="flex flex-col h-screen p-4 xl:ml-80">
        <aside className="-translate-x-80 fixed inset-0 z-50 h-full w-72 transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
          <Sidebar></Sidebar>
        </aside>
          <Navbar {...user} memuat={isLoading}></Navbar>
          <div className="flex-grow py-2">
            <Outlet></Outlet>
          </div>
          <div className="text-blue-gray-600">
            <Footer></Footer>
          </div>
        </div>
      </div>
    )
}