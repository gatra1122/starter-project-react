import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { NavLink, Link, Navigate, Outlet, useNavigate } from "react-router-dom"

import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";
import { Sidebar } from './widgets/Sidebar.jsx';
import { Footer } from './widgets/Footer.jsx';
import NavbarBaru from './widgets/NavbarBaru.jsx';

const navigation = [
  { name: 'Dashboard', to: '/Dashboard', current: true },
  { name: 'Pengguna', to: '/Pengguna', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DefaultLayout(){
  const {user,token,setUser,setToken} = useStateContext();

  if (!token) {
    return <Navigate to="/masuk"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

    return (
      <div className="bg-blue-gray-50/50">
        <aside className="bg-white shadow-sm -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
          <Sidebar></Sidebar>
        </aside>
        <div className="flex flex-col h-screen p-4 xl:ml-80">
          <NavbarBaru></NavbarBaru>
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