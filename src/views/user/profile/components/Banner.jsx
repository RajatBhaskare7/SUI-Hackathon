import React from "react";

import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import InputField from "components/fields/InputField";
import { useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";
const Banner = (props) => {
  const [showModal,setShowModal]  = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data,setData]  = useState([])
  const { user,investamount } = props;
  console.log(user);
  // console.log(investamount[0].investamount);

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
  {/* Background and profile */}
  <div
    className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
    style={{ backgroundImage: `url(${banner})` }}
  >
    <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
      <img className="h-full w-full rounded-full" src={process.env.REACT_APP_BASE_URL+'/'+`${user.photo}`} alt="" />
    </div>
  </div>

  {/* Edit button */}
  <Link to={`/user/editprofile/${user._id}`}>
  <button  className="absolute top-4 right-4 bg-transparent text-white text-sm font-semibold px-3 py-1 border border-white rounded-md hover:bg-white hover:text-navy-700 hover:border-transparent transition duration-300">
    Edit
  </button>

  </Link>
  

  <div className="mt-16 flex flex-col items-center">
    <h4 className="text-xl font-bold text-navy-700 dark:text-white">
      {user.username}
    </h4>
    <p className="text-base font-normal text-gray-600">{user.email}</p>
  </div>

   <div
      className="h-full w-full flex items-center justify-center mt-4"
   >
    <div className="h-1/2 w-1/4 flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
        
            <p className="ml-1 text-sm font-normal text-gray-600">Invested Amount</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            {investamount && investamount}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
           
            <p className="ml-1 text-sm font-normal text-gray-600">Withdrawal</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {
              user.withdrawal
            }
          </p>
        </div>
      </div>

   </div>
</Card>

  );
};

export default Banner;
