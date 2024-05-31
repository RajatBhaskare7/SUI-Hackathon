import InputField from "components/fields/InputField";

import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
export default function SignIn() {
  const [email, setEmail] = useState('');
  const history = useNavigate();

  const handleforgotpassword =()=>{
    console.log(email);

    axios.post(process.env.REACT_APP_BASE_URL + '/auth/user/forgotpassword', {email: email}).then((res)=>{
      console.log(res);
      if(res.data.Status == 'Success'){
        alert('Password reset link has been sent to your email');
        history('/auth/user');
      }else{
        alert('Email not found');
      }
    }).catch((err)=>{
      console.log(err);
    }
    )
  }

  
  return (
    <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
    <main className={`mx-auto min-h-screen`}>
      <div className="relative flex">
        <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
          <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
           
          <div className=" flex h-full w-full items-center mt-20  justify-center  ">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col justify-center items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Forgot Password
        </h4>
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mb-4 flex items-center justify-between px-2">
          
         
        </div>
        
          <button
          onClick={handleforgotpassword}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Send
        </button>
     

       
      </div>
    </div>
           
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </main>
  </div>
  );
}
