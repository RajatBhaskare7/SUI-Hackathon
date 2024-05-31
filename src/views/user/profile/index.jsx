import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import Tables from "./components/Tables";
import {useState, useEffect } from "react";
import axios from "axios";
import InvestmentTable from "./components/InvestmentTable";
const ProfileOverview = () => {
  const [user, setUser] = useState([]);
  const [profit, setProfit] = useState([]);
  const [investamount, setInvestAmount] = useState([]);
  const [currentinvestment, setCurrentInvestment] = useState([]);
  useEffect(() => {
    document.title = "Profile Overview | User";
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    Promise.all([
      axios.get(process.env.REACT_APP_BASE_URL + "/user/getuser"),
      axios.get(process.env.REACT_APP_BASE_URL + "/investment/getprofitbook"),
      axios.get(process.env.REACT_APP_BASE_URL+'/investment/getcurrentinvestment'),
    ])
      .then(([userRes,Profitres,currentinvestmentRes]) => {
        const user = userRes.data.filter((item) => item._id === id);
        setUser(user[0]);
        console.log(user[0]);
        const profit = Profitres.data.filter((item) => item.uid === id);
        setProfit(profit);
        const currentinvestment = currentinvestmentRes.data.filter((item) => item.uid === id);
        setCurrentInvestment(currentinvestment);
        setInvestAmount(currentinvestment[0].investamount);
        // console.log(currentinvestment[0].investamount);
        
      })
      .catch((err) => {
        console.log(err);
      });
 
  }, []);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-full mt-3  h-fit flex-col">
        <div className=" flex  justify-center col-span-4 lg:!mb-0">
          <Banner user={user} investamount={investamount} />
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
            columnsData={[
              
              {
                Header: "COIN NAME",
                accessor: "coinname",
              },
              {
                Header: "PROFIT BOOKED",
                accessor: "profitamount",
              },
              {
                Header: "PROFIT PERCENTAGE",
                accessor: "profitpercent",         
              },
              {
                Header: "PROFIT DATE",
                accessor: "profitdate",
              },
              
            ]}
            tableData={
             profit
              
            }
            
          />
         <div
          className="mt-5 grid grid-cols-1 md:grid-cols-1 gap-5"
         >
         <InvestmentTable
            columnsData={[
              {
                Header: "COIN NAME",
                accessor: "coinname",
              },
              {
                Header: "COIN PRICE",
                accessor: "coinprice",
              },
              {
                Header: "COIN QUANTITY",
                accessor: "coinquantity",
              },
              
              {
                Header: "INVESTMENT AMOUNT",
                accessor: "investamount",
              },{
                Header: "DATE (MM/DD/YYYY)",
                accessor: "investdate",
              },
            ]}
            tableData={currentinvestment}
            />
         </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
