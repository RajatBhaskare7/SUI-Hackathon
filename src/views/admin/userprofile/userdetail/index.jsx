import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation,useParams,Link } from "react-router-dom";
import Banner from "./components/Banner";
import General from "./components/General";

import Tables from "./components/Tables";
import routes from "routes.js";
import InputField from "components/fields/InputField";
import axios from "axios";
export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("User Detail");
  const [user,setUser]=React.useState([]);
  const [transaction,setTransaction]=React.useState([]);

  const [investamount,setInvestAmount]=React.useState(0);
  const [loading,setLoading]= useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([
    axios.get(process.env.REACT_APP_BASE_URL+`/transaction/gettransaction`),
    axios.get(process.env.REACT_APP_BASE_URL+`/user/getuser/`),
    axios.get(process.env.REACT_APP_BASE_URL+`/investment/getcurrentinvestment`)
    
   ])
   .then(([transactionResponse, userResponse,currentinvestmentRes])=>{
    const userres = userResponse.data.filter((user) => user._id === id)  
    setUser(userres[0]);
    const transactiondata=transactionResponse.data.filter((trans)=>trans.uid===id)
   
    const userMap = new Map(userres.map(user => [user._id, user]));
    const currentinvestment = currentinvestmentRes.data.filter((item) => item.uid === id);
    
    
  
    if(currentinvestment.length===0){
      setInvestAmount(0)
    }else{
      let totalamount=0;
      currentinvestment.map((item) => {
        totalamount += item.investamount
      })
      setInvestAmount(totalamount)

   
    }
  
      // Merge user names into transaction data
      const transactionsWithNames = transactiondata.map(transaction => ({
        ...transaction,
        name: userMap.get(transaction.uid).name
      }));
      setTransaction(transactionsWithNames);
   
      console.log(transactionsWithNames)
      setLoading(false);
   })
  }, [])




  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  

  document.documentElement.dir = "ltr";
  return (
   
    <div className="flex h-full w-full justify-center pt-10 items-center "
    style={{
      backgroundColor:"#0C1538"
    }}
    >
      {
      loading ? <div
        class="h-screen flex justify-center items-center"
      > <dotlottie-player src="https://lottie.host/42efddd6-e327-4839-88ba-098a0a6ef3f8/sg3Bewaizz.json" background="transparent" speed="1" style={{
        height: "300px",
        width:"300px",
      }} loop autoplay></dotlottie-player></div> : <div className="flex w-3/4 flex-col gap-5">
      <div className="w-full mt-3  h-fit flex-col">
      <div class=" p-4">
    <div class="flex justify-between items-center">
        <button class=" px-4 py-2 rounded "
          style={{
            backgroundColor:'#4F46E5',
            color:'#fff'
          }}   
          onClick={() => navigate(-1)}     
        > 
            Back
        </button>
    
        <div></div> 
    </div>
</div>
        <div className=" flex  justify-center col-span-4 lg:!mb-0">
          <Banner user={user} investamount={
            investamount
          }
            />
        </div>

        {/* <div className="col-span-3 lg:!mb-0">
          <Storage />
        </div> */}


      </div>
      {/* all project & ... */}

      <div className="h-full gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <General user={user} />
        </div>
        {/* <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
        <Project /> 
        </div> */}

        <div className="col-span-5 mt-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          {/* <Notification /> */}
          <Tables
            columnsData={
              [
                {
                  Header: "NAME",
                  accessor: "name",
                },
                {
                  Header: "AMOUNT",
                  accessor: "amount",
                },
                {
                  Header: "TYPE",
                  accessor: "type",
                },
                {
                  Header: "PAYMENT METHOD",
                  accessor: "PaymentMethod",
                },
                {
                  Header: "DATE (MM/DD/YYYY)",
                  accessor: "date",
                }
              ]
            
            }
            tableData={
             transaction
              
            }
           
          />
        </div>
      </div>
    </div>}

    </div>
  );
}
