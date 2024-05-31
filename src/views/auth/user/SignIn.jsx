import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Img from './../../../assets/img/login/hero.jpg'
import './form.css'
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(true);
  const [warning,setWarning] = useState(false);
  const [failed,setFailed] = useState(false);
  const [message,setMessage] = useState('');
  const [success,setSuccess] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const id = localStorage.getItem('id');
      axios.get(process.env.REACT_APP_BASE_URL+'/user/getuser').then((res)=>{
        const user = res.data.find((user) => user._id === id && user.role === 'user');
        if (!user) {
          // alert('You are Already Login as Admin Please Logout First');
          // history('/');
          setWarning(true);
          setTimeout(() => {
            setWarning(false);
            history('/');
          }, 2000);

      } else {
        setSuccess(true);
        setMessage('You are Already Login as User');
        setTimeout(() => {
          setSuccess(false);
          history('/user/dashboard');
        }, 1000);
          
      }

      })
      

      
    }
  }, []);
  const handleSignIn = (e) => {
    e.preventDefault();
    
    axios.post(process.env.REACT_APP_BASE_URL+'/auth/user/login', {
      email: email,
      password: password
    }).then(response => {
      
      localStorage.setItem('token', response.data.token);
  
      localStorage.setItem('id', response.data.user._id);
      setSuccess(true);
      setMessage('Login Successfully');
      setTimeout(() => {
        setSuccess(false);
        history('/user/dashboard');
      }, 1000);
    }
    ).catch((error) => {
      setFailed(true);
      setTimeout(() => {  
        setFailed(false);
      }, 1000);
      setMessage(error.response.data);
    });
  }
  return (<>
  {
    warning && <div class="absolute  mt-10 ml-10 start-0">
    <div class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
    <div class="flex p-4">
      <div class="flex-shrink-0">
        <svg class="flex-shrink-0 size-4 text-yellow-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
        </svg>
      </div>
      <div class="ms-3">
        <p class="text-sm text-gray-700 dark:text-gray-400">
        You are Already Login as Admin Please Logout First
        </p>
      </div>
    </div>
  </div>
  </div>
  }
  {
    failed && <div class="absolute  mt-10 ml-10 start-0">
    <div class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
    <div class="flex p-4">
      <div class="flex-shrink-0">
        <svg class="flex-shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 0a8 8 0 0 0 0 16A8 8 0 0 0 8 0zM7 5a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0V5zm1 7a1 1 0 0 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>
      </div>
      <div class="ms-3">
        <p class="text-sm text-gray-700 dark:text-gray-400">
        {message}
        </p>
      </div>
    </div>
  </div>
  </div>
  }
  {
    success && <div class="absolute  mt-10 ml-10 start-0">
    <div class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
    <div class="flex p-4">
      <div class="flex-shrink-0">
        <svg class="flex-shrink-0 size-4 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 0a8 8 0 0 0 0 16A8 8 0 0 0 8 0zM7 5a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0V5zm1 7a1 1 0 0 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>
      </div>
      <div class="ms-3">
        <p class="text-sm text-gray-700 dark:text-gray-400">
        {message}
        </p>
      </div>
    </div>
  </div>
  </div>
  }

  <section 
    
  class={`
  ${warning && 'pointer-events-none'}
  w-full h-full flex flex-col md:flex-row h-screen items-center`}
  style={{
    backgroundColor: "#0B1437",
    color: "#fff"
  }}
  >
    

  <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen"  >
    <img src={Img} alt="" class="w-full h-full object-cover"/>
  </div>

  <div class=" w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

    <div class="w-full ">

      <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

      <form class="mt-6" >
        <div>
          {/* <label class="block text-gray-700">Email Address</label> */}
          {/* <input type="email" name="" id="" placeholder="Enter Email Address" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required/> */}
          <InputField
          
                extra="mb-3"
      
                placeholder="Enter Email Address"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
        </div>

        <div class="mt-4">
          {/* <label class="float-lef text-gray-700">Password</label> */}
          <InputField
          variant="auth"
          extra="mb-3"
      
          placeholder="Enter Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>

        <div class="text-right mt-2">
           <Link to="/auth/user/forgotpassword" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?
            </Link>
        </div>

        <button type="submit" class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
        
              px-4 py-3 mt-6"
              onClick={handleSignIn}
              >Log In</button>
      </form>
    
      
{/* 
      <hr class="my-6 border-gray-300 w-full"/>

      <button type="button" class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
            <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
            <span class="ml-4">
            Log in
            with
            Google</span>
            </div>
          </button> */}

      {/* <p class="mt-8">Need an account? <a href="#" class="text-blue-500 hover:text-blue-700 font-semibold">Create an
              account</a></p> */}

      {/* <p class="text-sm text-gray-500 mt-12">&copy; 2020 Abstract UI - All Rights Reserved.</p> */}
    </div>
  </div>

</section>
</>

  );
}
