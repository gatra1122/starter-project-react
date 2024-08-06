import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, PencilIcon } from '@heroicons/react/24/outline'
import axios from "axios";

export default function Daftar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [validation, setValidation] = useState([]);

  const history = useNavigate();

    const registerHandler = async (e) => {
      e.preventDefault();
      
      //initialize formData
      const formData = new FormData();

      //append data to formData
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('password_confirmation', passwordConfirmation);

      //send data to server
      await axios.post('http://localhost:8000/api/register', formData)
      .then(() => {
          //redirect to login page
          history('/');
      })
      .catch((error) => {

          //assign error to state "validation"
          setValidation(error.response.data);
      })
  };

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

            <form className="max-w-xl w-full p-6 mx-auto" onSubmit={registerHandler}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-4xl font-extrabold">Sign Up</h3>
                <p className="text-gray-800 text-sm mt-6">Already registered ?<Link to="/masuk" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Sign in here</Link></p>
              </div>

              <div>
                <label className="text-gray-800 text-sm block mb-2">Name</label>
                <div className="relative flex items-center">
                  <input name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} 
                  className={"w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none " + (validation.name ? 'border-rose-500 invalid' : '')} placeholder="Enter full name" />
                  <svg className="w-[18px] h-[18px] absolute right-2" opacity="0.5">
                    <PencilIcon/>
                  </svg>
                </div>
                {validation.name && (
                <div className="alert alert-danger text-red-600">
                    {validation.name[0]}
                </div>
                )}
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-sm block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                  className={"w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none " + (validation.email ? 'border-rose-500 invalid' : '')} placeholder="Enter email" />
                  <svg className="w-[18px] h-[18px] absolute right-2" opacity="0.5">
                    <EnvelopeIcon/>
                  </svg>
                </div>
                {validation.email && (
                <div className="alert alert-danger text-red-600">
                    {validation.email[0]}
                </div>
                )}
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-sm block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input name="password" type={passwordShown ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} 
                  className={"w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none " + (validation.password ? 'border-rose-500 invalid' : '')} placeholder="Enter password" />
                  <svg onClick={togglePasswordVisiblity} className="w-[18px] h-[18px] absolute right-2" opacity="0.5">
                    {passwordShown ? <EyeSlashIcon/> : <EyeIcon />}
                  </svg>
                </div>
                {validation.password && (
                <div className="alert alert-danger text-red-600">
                    {validation.password[0]}
                </div>
                )}
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-sm block mb-2">Confirm Password</label>
                <div className="relative flex items-center">
                  <input name="passwordConfirmation" type={passwordShown ? "text" : "password"} required value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
                  <svg onClick={togglePasswordVisiblity} className="w-[18px] h-[18px] absolute right-2" opacity="0.5">
                    {passwordShown ? <EyeSlashIcon/> : <EyeIcon />}
                  </svg>
                </div>
              </div>

              <div className="mt-12">
                <button type="submit" className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  