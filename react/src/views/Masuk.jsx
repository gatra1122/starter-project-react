import { useState } from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import { Link, useNavigate } from "react-router-dom"
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Input, Button, Spinner } from "@material-tailwind/react";

export default function Masuk() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const [isLoading, setIsLoading] = useState(false)
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()
    setIsLoading(true);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
        setIsLoading(false);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
          setIsLoading(false);
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
            <form className="animate-fade-down animate-duration-200 max-w-xl w-full p-6 mx-auto" onSubmit={onSubmit}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-4xl font-extrabold">Masuk</h3>
                <p className="text-gray-800 text-sm mt-6">Tidak punya akun ? <Link to="/daftar" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Daftar disini</Link></p>
              </div>

              {message &&
                <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                <strong className="font-bold text-sm mr-4">Error!</strong>
                <span className="block text-sm sm:inline max-sm:mt-2">{message}</span>
              </div>
              }
              <div className="mt-8">
                <Input inputRef={emailRef} name="email" type="email" variant="standard" label="Email" placeholder="Masukkan alamat email" icon={<EnvelopeIcon/>} required/>
              </div>
              <div className="mt-8">
                <Input inputRef={passwordRef} name="password" type={passwordShown ? "text" : "password"} 
                variant="standard" label="Password" placeholder="Masukkan password" 
                icon={passwordShown ? <EyeSlashIcon onClick={togglePasswordVisiblity}/> : <EyeIcon onClick={togglePasswordVisiblity} />}
                required/>
              </div>

              {/* <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
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
              </div> */}

              <div className="mt-12">
                <Button type="submit" className="animate-duration-1000" loading={isLoading} fullWidth>Masuk</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  