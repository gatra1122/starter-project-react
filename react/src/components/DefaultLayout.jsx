import { Navigate, Outlet } from "react-router-dom"
import {useStateContext} from "../context/ContextProvider.jsx";
import { usePageContext } from "../context/ContextPage.jsx";
import axiosClient from "../axios-client.js";
import {useEffect,useState} from "react";
import { Sidebar } from './widgets/Sidebar.jsx';
import { Footer } from './widgets/Footer.jsx';
import Navbar from './widgets/Navbar.jsx';
import { Breadcrumbs } from "@material-tailwind/react";

export default function DefaultLayout(){
  
  const [isLoading, setIsLoading] = useState(false);
  const {user,token,setUser,setToken} = useStateContext();
  const {title,setTitle,bread,setBread} = usePageContext();

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
        <div className="flex flex-grow h-screen overflow-hidden">
            {/* Sidebar */}
            {/* <Sidebar></Sidebar> */}
            
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Navbar {...user} memuat={isLoading}></Navbar>

                <main className="h-screen flex">
                <Sidebar></Sidebar>
                    <div className="flex flex-col px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Dashboard actions */}
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            {/* Left: Title */}
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                                    {title}
                                </h1>
                            </div>

                            {/* Right: Actions */}
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                <Breadcrumbs>
                                {bread.map(function(data) {
                                  return (
                                    <a key={data.id} href={data.url} className={data.url != '#' ? 'opacity-60' : ''}>{data.name}</a>
                                  )
                                })}
                                </Breadcrumbs>
                            </div>
                        </div>
                        <Outlet></Outlet>
                        <div className="mt-auto">
                        <Footer></Footer>
                        </div>
                        
                    </div>
                    
                </main>
                
            </div>
        </div>
    );
}

