import { useState } from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import { Link, useNavigate } from "react-router-dom"
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'


export default function Masuk() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

    return (
      <div>
        <div className="font-[sans-serif]">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
            <div className="max-md:order-1 h-screen min-h-full">
              <img src="public/assets/img/image-3.webp" className="w-full h-full object-cover" alt="login-image" />
            </div>

            <form className="animate-fade-down animate-once animate-duration-200 max-w-xl w-full p-6 mx-auto" onSubmit={onSubmit}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-4xl font-extrabold">Sign in</h3>
                <p className="text-gray-800 text-sm mt-6">Don't have an account <Link to="/daftar" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
              </div>

              {message &&
                <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                <strong className="font-bold text-sm mr-4">Error!</strong>
                <span className="block text-sm sm:inline max-sm:mt-2">{message}</span>
              </div>
              }
              <div className="mt-8">
                <label className="text-gray-800 text-sm block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input ref={emailRef} name="email" type="email" required
                  className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter email" />
                  <svg className="w-[18px] h-[18px] absolute right-2" opacity="0.5">
                    <EnvelopeIcon/>
                  </svg>
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-sm block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input ref={passwordRef} name="password" type={passwordShown ? "text" : "password"} required
                  className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
                  <svg onClick={togglePasswordVisiblity} className="w-[18px] h-[18px] absolute right-2" opacity="0.5">
                    {passwordShown ? <EyeSlashIcon/> : <EyeIcon />}
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="jajvascript:void(0);" className="text-blue-600 font-semibold text-sm hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="mt-12">
                <button type="submit" className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  