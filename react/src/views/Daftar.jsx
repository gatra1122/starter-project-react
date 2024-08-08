import { createRef, useState } from "react";
import { Link } from "react-router-dom"
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { Input, Button, Spinner } from "@material-tailwind/react";

export default function Daftar() {
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const [isLoading, setIsLoading] = useState(false)
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()
    setIsLoading(true)

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
        setIsLoading(false)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
          setIsLoading(false)
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
                <h3 className="text-gray-800 text-4xl font-extrabold">Daftar</h3>
                <p className="text-gray-800 text-sm mt-6">Sudah punya akun ?<Link to="/masuk" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Masuk disini</Link></p>
              </div>

              {errors &&
            <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
              <strong className="font-bold text-sm mr-4">Gagal !</strong>
              <ul className="mt-2 ml-2 list-inside list-disc">
              {Object.keys(errors).map(key => (
                  <li key={key}>{errors[key][0]}</li>
              ))}
              </ul>
            </div>
          }

              <div className="mt-8">
                <Input inputRef={nameRef} name="name" type="text" variant="standard" label="Nama" placeholder="Masukkan nama anda" icon={<PencilIcon/>} 
                error={errors != null && errors.name ? 'error' : ''}
                required/>
              </div>
              <div className="mt-8">
                <Input inputRef={emailRef} name="email" type="email" variant="standard" label="Email" placeholder="Masukkan alamat email" icon={<EnvelopeIcon/>}
                error={errors != null && errors.email ? 'error' : ''}
                required/>
              </div>
              <div className="mt-8">
                <Input inputRef={passwordRef} name="password" type={passwordShown ? "text" : "password"} 
                variant="standard" label="Password" placeholder="Masukkan password" 
                icon={passwordShown ? <EyeSlashIcon onClick={togglePasswordVisiblity}/> : <EyeIcon onClick={togglePasswordVisiblity} />}
                error={errors != null && errors.password ? 'error' : ''}
                required/>
              </div>
              <div className="mt-8">
                <Input inputRef={passwordConfirmationRef} name="password_confirmation" type={passwordShown ? "text" : "password"} 
                variant="standard" label="Konfirmasi Password" placeholder="Konfirmasi password" 
                icon={passwordShown ? <EyeSlashIcon onClick={togglePasswordVisiblity}/> : <EyeIcon onClick={togglePasswordVisiblity} />}
                error={errors != null && errors.password ? 'error' : ''}
                required/>
              </div>

              <div className="mt-12">
              <div className="mt-12">
                <Button type="submit" className="animate-duration-1000" loading={isLoading} fullWidth>Daftar</Button>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  