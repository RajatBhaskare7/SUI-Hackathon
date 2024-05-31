import TotalSpent from "views/user/default/components/TotalSpent";
import PieChartCard from "views/user/default/components/PieChartCard";

import { IoDocuments } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "./components/CheckTable";
import ComplexTable from "./components/ComplexTable";
import DailyTraffic from "./components/DailyTraffic";

import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = (props) => {
  const [investment, setInvestment] = useState([]);
  const [user, setUser] = useState({});
  const [totalinvested, setTotalInvested] = useState(0);
  const [totalprofit, setTotalProfit] = useState(0);
  const [totaldays, setTotalDays] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('id');
    Promise.all([
      axios.get(process.env.REACT_APP_BASE_URL + '/investment/getinvestment'),
      axios.get(process.env.REACT_APP_BASE_URL + '/user/getuser'),
      axios.get(process.env.REACT_APP_BASE_URL + '/investment/getprofitbook')
    ])
      .then(([investmentResponse, userResponse, profitRes]) => {
        const investmentData = investmentResponse.data;
        const userinvestment = investmentData.filter((item) => item.uid === id);
        const userData = userResponse.data;

        userData.map((item) => {
          if (item._id === id) {
            setUser(item);
            let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
        let joindate = item.JoinDate;
        let formattedJoinDate = new Date(joindate).toISOString().split('T')[0];
        let tota = Math.floor((Date.parse(date) - Date.parse(formattedJoinDate)) / 86400000);
        setTotalDays(tota);
          }
        })
        

        const profit = profitRes.data.filter((item) => item.uid === id);
        let totalprofit = 0;
        profit.forEach((item) => {
          totalprofit += item.profitamount;
        });
        setTotalProfit(totalprofit);

        setInvestment(userinvestment);

        let total = 0;

        userinvestment.forEach((item) => {
          total += item.investamount;
        });

        setTotalInvested(total);

        

        // Calculate total investment for each coin
        const coinInvestments = {};
        userinvestment.forEach((item) => {
          if (coinInvestments[item.coinname]) {
            coinInvestments[item.coinname] += item.investamount;
          } else {
            coinInvestments[item.coinname] = item.investamount;
          }
        });

        // Calculate percentages
        const totalInvestmentAmount = Object.values(coinInvestments).reduce(
          (acc, cur) => acc + cur,
          0
        );

        const percentages = {};
        Object.keys(coinInvestments).forEach((coin) => {
          percentages[coin] = (coinInvestments[coin] / total) * 100;
        });

        // Sort the coins based on their percentages in descending order
        const sortedCoins = Object.keys(percentages).sort(
          (a, b) => percentages[b] - percentages[a]
        );

        // Create an array of all the coins and their percentages and their date of investment
        const coinarray = userinvestment.map((item) => ({
          name: item.coinname,
          percentage: percentages[item.coinname],
          coinquantity: item.coinquantity,
          date: item.investdate
        }));

        setTableData(coinarray);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      

  }, []);

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Invested"}
          subtitle={"Rs " + totalinvested}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Current Profit"}
          subtitle={"Rs " + totalprofit}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Days"}
          subtitle={totaldays}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <PieChartCard totalinvested={totalinvested} investment={investment} />
        <TotalSpent />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={[
              {
                Header: "NAME",
                accessor: "name",
              },
              {
                Header: "ALLOCATION",
                accessor: "percentage",
              },
              {
                Header: "QUANTITY",
                accessor: "coinquantity",
              },
              {
                Header: "DATE",
                accessor: "date",
              },
            ]}
            tableData={tableData}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
