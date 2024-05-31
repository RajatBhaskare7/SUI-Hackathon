

import {
  columnsDataDevelopment,

  columnsDataColumns,

} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";

import tableDataColumns from "./variables/tableDataColumns.json";

import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckTable from "./components/CheckTable";
import ComplexTable from "./components/ComplexTable";
const Tables = () => {
  const [transactiondata,setTransactiondata]=useState([]);
  const [investmentdata,setInvestmentdata] = useState([]);
  const [currentinvestment,setCurrentInvestment] = useState([]);
  const [profitbook,setProfitbook]=useState([]);
  const [users,setUser]=useState([]);
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(process.env.REACT_APP_BASE_URL+'/transaction/gettransaction'),
      axios.get(process.env.REACT_APP_BASE_URL+'/user/getuser'),
      axios.get(process.env.REACT_APP_BASE_URL+'/investment/getinvestment'),
      axios.get(process.env.REACT_APP_BASE_URL+'/investment/getcurrentinvestment'),
      axios.get(process.env.REACT_APP_BASE_URL+'/investment/getprofitbook')
    ])
    .then(([transactionResponse, userResponse,investmentResponse,currentinvestmentRes,Profitbookres]) => {
      const transactionData = transactionResponse.data;
      const userData = userResponse.data;
      const investmentData= investmentResponse.data;
      const CurrentInvestment = currentinvestmentRes.data;
      const Profitbook = Profitbookres.data;

      // console.log(profitbook)
      

      
  
      // Create a map of users for quick lookup
      const userMap = new Map(userData.map(user => [user._id, user]));
  
      // Merge user names into transaction data
      const transactionsWithNames = transactionData.map(transaction => ({
        ...transaction,
        name: userMap.has(transaction.uid) ? userMap.get(transaction.uid).name : 'Deleted user'
      }));
  
      const investmentWithNames = investmentData.map(investment => ({
        ...investment,
        name: userMap.has(investment.uid) ? userMap.get(investment.uid).name : 'Deleted user'
      }));
  
      const currinvestmentWithNames = CurrentInvestment.map(investment => ({
        ...investment,
        name: userMap.has(investment.uid) ? userMap.get(investment.uid).name : 'Deleted user'
      }));
  
      const profitbookWithNames = Profitbook.map(investment => ({
        ...investment,
        name: userMap.has(investment.uid) ? userMap.get(investment.uid).name : 'Deleted user'
      }));


      //make both of them in descending order
      transactionsWithNames.sort((a, b) => new Date(b.date) - new Date(a.date));
      investmentWithNames.sort((a,b)=> new Date(b.investdate) - new Date(a.investdate));
      currinvestmentWithNames.sort((a,b)=> new Date(b.investdate) - new Date(a.investdate));
      profitbookWithNames.sort((a,b)=> new Date(b.investdate) - new Date(a.investdate));
      // Update state with merged data
      setTransactiondata(transactionsWithNames);
      setInvestmentdata(investmentWithNames);
      setCurrentInvestment(currinvestmentWithNames);
      setProfitbook(profitbookWithNames);
      setLoading(false);
      
    })
    .catch(error => {
      // Handle errors here
      console.error('Error fetching data:', error);
    });

  },[]);

  
  return (
    <div>
     {
      loading ? <div
        class="h-screen flex justify-center items-center"
      > <dotlottie-player src="https://lottie.host/42efddd6-e327-4839-88ba-098a0a6ef3f8/sg3Bewaizz.json" background="transparent" speed="1" style={{
        height: "300px",
        width:"300px",
      }} loop autoplay></dotlottie-player></div> :
      <>
         <div class="mt-5">
  <div class="grid grid-cols-1 md:grid-cols-1 gap-5">
    <DevelopmentTable
      columnsData={
        [
          {
            Header: "TRANSACTION ID",
            accessor: "_id",
          },
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
      tableData={transactiondata}
    />
  </div>
</div>

<div class="mt-5">
  <div class="grid grid-cols-1 md:grid-cols-1 gap-5">
    <ColumnsTable
      columnsData={[
        {
          Header: "USERNAME",
          accessor: "name",
        },
        {
          Header: "COIN NAME",
          accessor: "coinname",
        },
        {
          Header: "INVESTMENT AMOUNT",
          accessor: "investamount",
        },
        {
          Header: "COIN PRICE",
          accessor: "coinprice",
        },
        {
          Header: "COIN QUANTITY",
          accessor: "coinquantity",
        },
        // {
        //   Header: "COIN CODE",
        //   accessor: "coincode",
        // },
        {
          Header: "DATE (MM/DD/YYYY)",
          accessor: "investdate",
        },
        // {
        //   Header: "TRADE",
        //   accessor: "_id",
        // }
      ]}
      tableData={investmentdata}
    />
  </div>
</div>
<div class="mt-5">
  <div class="grid grid-cols-1 md:grid-cols-1 gap-5">
    <CheckTable
      columnsData={[
        {
          Header: "USERNAME",
          accessor: "name",
        },
        {
          Header: "COIN NAME",
          accessor: "coinname",
        },
        {
          Header: "INVESTMENT AMOUNT",
          accessor: "investamount",
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
          Header: "DATE (MM/DD/YYYY)",
          accessor: "investdate",
        },
        {
          Header: "TRADE",
          accessor: "_id",
        }
      ]}
      tableData={currentinvestment}
    />
  </div>
</div>
<div class="mt-5">
  <div class="grid grid-cols-1 md:grid-cols-1 gap-5">
    <ComplexTable
      columnsData={[
        {
          Header: "USERNAME",
          accessor: "name",
        },
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
      tableData={profitbook}
    />
  </div>
</div>
      </>
     }


    </div>
  );
};

export default Tables;
