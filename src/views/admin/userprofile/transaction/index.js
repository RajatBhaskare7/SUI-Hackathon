import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, Link } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar/index.jsx";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import InputField from "components/fields/InputField";
import Dropdown from "components/dropdown";
import axios from "axios";
import Img from "./../../../../assets/img/nfts/transaction.png"
import Banner1 from "views/admin/marketplace/components/Banner";
export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Add Transaction");
  const [user, setUser] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading,setLoading]=useState(true);
  const [transaction, setTransaction] = React.useState({
    amount: "",
    type: "",
    paymentMethod: "",
    date: Date.now(),
  });

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL+`/user/getuser/`)
      .then(response => {
        const res = response.data.filter((user) => user._id === id)
        console.log(res)
        setUser(res[0]);
        setLoading(false)
      })
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  const handleAddTransaction = () => {
    axios
      .post(process.env.REACT_APP_BASE_URL+`/transaction/addtransaction/${id}`, transaction)
      .then((res) => {
        if (res.status === 200) {
          
          setSuccess(true);
          setMessage("Transaction added successfully");
          setTimeout(() => {
            setSuccess(false);
            navigate(`/admin/userdetail/${id}`);
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          setFailed(true);
          setMessage(err.response.data.message);
          setTimeout(() => {
            setFailed(false);
          }, 1000);
        }
      });
  };

  return (
    <>
       {
      loading ? <div
        class="h-screen flex justify-center items-center h-full w-full bg-lightPrimary dark:!bg-navy-900"
      > <dotlottie-player src="https://lottie.host/42efddd6-e327-4839-88ba-098a0a6ef3f8/sg3Bewaizz.json" background="transparent" speed="1" style={{
        height: "300px",
        width:"300px",
      }} loop autoplay></dotlottie-player></div> :<> 

      {
      failed && <div class="absolute bottom-0 mt-10 ml-10 start-0">
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
      success && <div class="absolute bottom-0  mt-10 ml-10 start-0">
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
   
    <div className=" h-full w-full">
      
      
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 `}>
          <div className="h-full">
            <Navbar
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <main className={`mx-[12px] h-full flex-none text-white  transition-all`}
            
            >
                   
              <div class="px-2 py-12">
                {/* <Banner1 className="text-black"/> */}
                <div class=" ">
   
</div>

               
               <div className="w-full flex  items-center  rounded  shadow justify-center ">
                
               <div  style={{
                          backgroundColor: "#111C44",
                          borderRadius: "20px",
                        }}>
                        <div class="flex justify-between items-center p-5">
        <button class=" px-4 py-2 rounded "
          style={{
            backgroundColor:'#4F46E5',
            color:'#fff',
            borderRadius:'10px'
          }}   
          onClick={() => navigate(-1)}     
        > 
            Back
        </button>
    
        <div></div> 
    </div>

  
                 <div className="flex-wrap flex items-center mt-7 w-full rounded py-7 shadow justify-center">
                 <div class="w-full md:w-1/3">
                 
                        


                 <dotlottie-player src="https://lottie.host/f2675f3d-2436-4886-9279-4da61acbd5a9/FTIJvJWUbk.json" background="transparent" speed="1"  
                  style={{
                   width:'100%',
                   height:'100%',
                   margin:'1rem'
                 
                 }}
                 className="
                 
                 
                 "
                 loop autoplay></dotlottie-player>
                     {/* <img src={Img} alt="NFT" style={{
                       width:'100%',
                       height:'100%',
                       margin:'1rem'
                     }}/> */}
                                   </div>
                                   <div class="w-full md:w-2/3">
                                     <div class="py-4 px-2">
                                       <div
                                         
                                       >
                                         <div class="mt-10 px-7">
                                           <div class="mt-7 grid w-full grid-cols-1 gap-7 md:grid-cols-1 lg:grid-cols-2">
                                             <div>
                                               <p class="text-white-800 text-base font-medium leading-none">
                                                 Name
                                               </p>
                                               <InputField
                                                 class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                                 value={`${user.name}`}
                                                 disabled
                                               />
                                             </div>
                                             <div>
                                               <p class="text-white-800 text-base font-medium leading-none">
                                                 email
                                               </p>
                                               <InputField
                                                 class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                                 value={`${user.email}`}
                                                 disabled
                                               />
                                             </div>
                                             <div>
                                               <p class="text-white-800 text-base font-medium leading-none">
                                                 Date
                                               </p>
                                               <InputField
                                                 class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                                 type="text"
                                                 value={
                                                   new Date(transaction.date).toLocaleDateString()
                                                 }
                                                 required
                                                 disabled
                                                 
                                               />
                                             </div>
                                             <div>
                                               <p class="text-white-800 text-base font-medium leading-none">
                                                 Amount
                                               </p>
                                               <InputField
                                                 class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                                 type="number"
                                                 required
                                                 min="1"
                                                 onChange={(e) =>
                                                   setTransaction({
                                                     ...transaction,
                                                     amount: e.target.value,
                                                   })
                                                 }
                                                 value={transaction.amount}
                                               />
                                             </div>
                                             <div>
                                               <p class="text-white-800 text-base font-medium leading-none">
                                                 Type
                                               </p>
                                               <select
                                                 id="countries"
                                                 required
                                                 class="mt-7 flex h-12 w-full items-center justify-center rounded-xl  border bg-white/0 p-3 text-sm outline-none"
                                                 onChange={(e) =>
                                                   setTransaction({
                                                     ...transaction,
                                                     type: e.target.value,
                                                   })
                                                 }
                                               >
                                                 <option
                                                   className="bg-white/0 text-sm text-navy-700 dark:text-white"
                                                   style={{
                                                     backgroundColor: "#111C44",
                                                   }}
                                                   value=""
                                                 >
                                                   select type
                                                 </option>
                                                 <option
                                                   className="bg-white/0 text-sm text-navy-700 dark:text-white"
                                                   style={{
                                                     backgroundColor: "#111C44",
                                                   }}
                                                   value="SEND"
                                                 >
                                                   SEND
                                                 </option>
                                                 <option
                                                   className="bg-white/0 text-sm text-navy-700 dark:text-white"
                                                   style={{
                                                     backgroundColor: "#111C44",
                                                   }}
                                                   value="RECEIVE"
                                                 >
                                                   RECEIVE
                                                 </option>
                                               </select>
                                             </div>
                                             <div>
                                               <p class="text-white-800 text-base font-medium leading-none">
                                                 Payment Method
                                               </p>
                                               <InputField
                                                 class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                                 type="text"
                                                 required
                                                 min="1"
                                                 onChange={(e) =>
                                                   setTransaction({
                                                     ...transaction,
                                                     paymentMethod: e.target.value,
                                                   })
                                                 }
                                                 value={transaction.paymentMethod}
                                               />
                                             </div>
                                           </div>
                                         </div>
                                         <div className="flex mt-7 justify-center">
                                           <button
                                             class="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[174px] w-full"
                                             onClick={handleAddTransaction}
                                           >
                                             Add Transaction
                                           </button>
                                         </div>
                                       </div>
                                     </div>
                                   </div>
                 </div>
                </div>
               </div>
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
    </>}
    </>
  );
}
