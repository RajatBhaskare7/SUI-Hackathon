import React, { useEffect,useState } from "react";
import { Routes, Route, useNavigate, useLocation,useParams,Link } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar/index.jsx";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import InputField from "components/fields/InputField";
import axios from "axios";
import Banner from "views/admin/marketplace/components/Banner";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Add Investment");
  const [user,setUser]=React.useState([]);
  const [success, setSuccess] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const { id } = useParams();
  const [message, setMessage] = React.useState("");
  const [cryptoData, setCryptoData] = useState(null);
  const [loading,setLoading]= useState(true);
  const [investment,setInvestment] = useState({

    investamount: "",
    investtype: "BUY",
    coinname:"",
    investdate:"",
    coincode:"",
    coinprice:"",
    coinquantity:""
  });
    

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL+`/user/getuser/`)
    .then(response => {
      const res = response.data.filter((user) => user._id === id)
    
      setUser(res[0]);
    }
    )
    const fetchData = async () => {
      axios.get(process.env.REACT_APP_BASE_URL+`/api/list`)
      .then(response => {
        const data = response.data.data;
        //sort data by name 
        data.sort((a, b) => a.name.localeCompare(b.name));
        setCryptoData(data);
        console.log(data)




      })
      setLoading(false)

    };

    fetchData();

  }, [id]);




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

  const handleCreateInvestment = () => {
    const investmentData = {
      investamount: investment.investamount,
      investtype: investment.investtype,
      coinname: investment.coinname,
      investdate: investment.investdate,
      coincode: computedCoinCode,
      coinprice: investment.coinprice,
      coinquantity: computedCoinQuantity
    }
    console.log(investmentData)
    //check if all fields are filled
    if(investmentData.investamount === "" || investmentData.coinname === "" || investmentData.investdate === "" || investmentData.coinprice === "" || investmentData.coinquantity === ""){
      setFailed(true);
      setMessage("Please fill all fields");
      setTimeout(() => {
        setFailed(false);
      }, 2000);
    }
    else{
      axios.post(process.env.REACT_APP_BASE_URL+`/investment/addinvestment/${id}`,investmentData)
      .then(response => {
        if(response.data){
          
          setSuccess(true)
          setMessage(response.data)
          setTimeout(() => {
            setSuccess(false);
            navigate(-1)
  
          }, 3000);
      
          
        }
        
      })
      .catch((err)=>{
        setFailed(true);
        setMessage("Investment Failed Try Again")
        setTimeout(()=>{
          setFailed(false);
        },3000);
      })
    }
  }
  const computedCoinCode = cryptoData?.filter(
    (item) => item.name === investment.coinname
  )[0]?.symbol;

  

  // Compute coinquantity
  const computedCoinQuantity = investment.investamount && investment.coinprice
    ? investment.investamount / investment.coinprice
    : "";
   

  


  return (
   <>
     {
      loading ? <div
        class="h-full w-full bg-lightPrimary dark:!bg-navy-900 h-screen flex justify-center items-center"
      > <dotlottie-player src="https://lottie.host/42efddd6-e327-4839-88ba-098a0a6ef3f8/sg3Bewaizz.json" background="transparent" speed="1" style={{
        height: "300px",
        width:"300px",
      }} loop autoplay></dotlottie-player></div> : <>    {
      failed && <div class="absolute  mb-10 ml-10 bottom-10 start-0">
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
      success && <div class="absolute  mb-10 ml-10 bottom-0 start-0">
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
      
      {/* <Sidebar open={open} onClose={() => setOpen(false)} /> */}
      
      
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 `}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
            //   onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
    
              {...rest}
            />
        
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all  text-white`}

       
        >
          {/* Routes */}
          
          
         
    <div class="px-2 py-12">
    {/* <Banner/> */}
    
  
      <div class="flex flex-no-wrap items-center  justify-center">
        
        <div class="w-full ">
          <div class="py-4 px-2">
            <div class=" rounded shadow mt-7 py-7"
              style={{
                backgroundColor:'#111C44',
                borderRadius: "20px",
              }}
            >
             <div class="flex p-5 justify-between items-center">
        <button class=" px-4 py-2 rounded "
          style={{
            backgroundColor:'#4F46E5',
            color:'#fff'
          }}   
          onClick={() => navigate(-1)}     
        > 
           Go Back
        </button>
    
        <div></div> 
    </div>
              
           
              <div class="mt-10 px-7">
               
                
                <div
                  class="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7"
                >
               
                  
                  

                 
                  <div>
                    <p class="text-base mb-3 font-medium leading-none text-white-800">
                      Name
                    </p>
                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      value={`${user.name}`}
                      disabled
                    />
                   
                  </div>
                  <div>
                    <p class="text-base mb-3 font-medium leading-none text-white-800">
                      Email
                    </p>
                    <InputField
                      class="w-full mt-3 border border-white-300 rounded outline-none focus:bg-white-50"
                      value={`${user.email}`}
                      disabled
                    />
                   
                  </div>
                  <div>
                    <p class="text-base mb-3 font-medium leading-none text-white-800">
                      Total Balance
                    </p>
                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      value={`${user.balance}`}
                      disabled
                    />
                   
                  </div>
                  
                  
                  <div>
                    <p class="text-base font-medium leading-none text-white-800">
                      Invested Coin
                    </p>
                    <select
                                id="countries"
                                required
                                class="mt-11 flex h-12 w-full items-center justify-center rounded-xl  border bg-white/0 p-3 text-sm outline-none"
                    onChange={(e) => {
                      setInvestment({
                        ...investment,
                        coinname: e.target.value,
                      });
                    }
                    }
                              >
                                {
                                 cryptoData && cryptoData.map((item)=>{
                                    return(
                                      <option
                                      className="bg-white/0 text-sm
                                      text-navy-700 dark:text-white
                                      "
                                                  style={{
                                                    backgroundColor: "#111C44",
                                                    margin: "0px",
                                                    padding: "100px",
                                                  
                                                  }}
                                                  value={item.name}
                                                  key={item.id}

                                                  
                                          
                                      >{item.name}{" "}( {item.symbol} )</option>
                                    )
                                  })
                                }
                                
                           
                              </select>
                   
                  </div>
                  <div>
                    <p class="text-base mb-3  font-medium leading-none text-white-800">
                      Invested Amount
                    </p>
                    <InputField
                      class="w-full py-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      type="number"
                      onChange={(e) => {
                        setInvestment({
                          ...investment,
                          investamount: e.target.value,
                        });
                      }}
                      required
                 
                    />
                   
                  </div>
                  <div>
                    <p class="text-base mb-3 font-medium leading-none text-white-800">
                      Investment Date
                    </p>
                    <InputField
                      class="w-full  mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      type="datetime-local"
                      required
                      onChange={(e) => {
                        setInvestment({
                          ...investment,
                          investdate: Date.now,
                        });
                        
                      }}
                    />
                   
                  </div>
                  <div>
                    <p class="text-base mb-3 font-medium leading-none text-white-800">
                      Investment Type
                    </p>
                    <InputField 
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      type="text"
                      value={investment.investtype}
                      disabled
                    />
                   
                  </div>
                  <div>
                    <p class="text-base  mb-3 font-medium leading-none text-white-800">
                      Investment Coin Code
                    </p>
                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      type="text"
                      value={computedCoinCode || ""}
                      onChange={(e) => {
                        setInvestment({
                          ...investment,
                          coincode: e.target.value,
                        });
                      }}
                      disabled
                          
                    />
                   
                  </div>
                  <div>
                    <p class="text-base font-medium leading-none text-white-800">
                      Coin Price at Investment
                    </p>
                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      required
                      type="number"
                      onChange={(e) => {
                        setInvestment({
                          ...investment,
                          coinprice: e.target.value,
                        });
                      }}
                 
                    />
                   
                  </div>
                  <div>
                    <p class="text-base font-medium leading-none text-white-800">
                    No. of coins received
                    </p>
                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                    
                      value={computedCoinQuantity}
                                            disabled
                                            

                        
                        
                          
                    />
                   
                  </div>
                </div>
                <div class="mt-7 flex justify-center">
                  <button
                    // class="w-1/2 py-4 text-white font-medium rounded bg-gradient-to-r from-cyan-400 to-lightBlue-500"
                    class="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[174px] w-full"

                    onClick={handleCreateInvestment}
                  >
                    Add Investment
                  </button>
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
