import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import { useEffect, useState } from "react";
import Widget from "components/widget/Widget";
import CheckTable from "./components/CheckTable";

import tableDataCheck from "./variables/tableDataCheck.json";
import ComplexTable from "../tables/components/ComplexTable";
import axios from "axios";

const Dashboard = () => {
  const [totalinvested, setTotalInvested] = useState(0)
  const [currentProfit, setCurrentProfit] = useState(0)
  const [currentValue, setCurrentValue] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [profitbook,setProfitbook]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    // fetch data
    Promise.all([
      axios.get(process.env.REACT_APP_BASE_URL + "/investment/getinvestment"),
      axios.get(process.env.REACT_APP_BASE_URL + "/investment/getprofitbook"),
      axios.get(process.env.REACT_APP_BASE_URL + "/user/getuser"),
    ]).then(([investmentres,profitbook,userRes]) => {
      let totalinvested = 0;
      let currentProfit = 0;
      console.log(profitbook.data)
      //length of userRes.data
      setTotalUsers(userRes.data.length)
      
      const users = userRes.data;
      // Create a map of users for quick lookup
      const userMap = new Map(users.map(user => [user._id, user]));

      const profitbookWithNames = profitbook.data.map(investment =>({ 
        ...investment,
        name:userMap.get(investment.uid).name
      }))
      console.log(profitbookWithNames)

      setProfitbook(profitbookWithNames)
      investmentres.data.forEach((investment) => {
        totalinvested += investment.investamount;
      }
      )
      profitbook.data.forEach((profit) => {
        currentProfit += profit.profitamount;
      }
      )
      setTotalInvested(totalinvested)
      setCurrentProfit(currentProfit)
      setLoading(false);

    }
    )
  }, [])
  return (
    <div>
      {/* Card widget */}

      {
      loading ? <div
        class=" h-screen flex justify-center items-center"
      >

      <dotlottie-player src="https://lottie.host/42efddd6-e327-4839-88ba-098a0a6ef3f8/sg3Bewaizz.json" background="transparent" speed="1" style={{
        height: "300px",
        width:"300px",
      }} loop autoplay></dotlottie-player></div> :<>
  <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Invested"}
          subtitle={"$"+totalinvested}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Current Profit"}
          subtitle={"$"+currentProfit}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Users"}
          subtitle={totalUsers}
        />
        {/* <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        /> */}
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
      <PieChartCard />
        <TotalSpent />
        {/* <WeeklyRevenue /> */}
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5">
        {/* Check Table */}
        <div>
          {/* <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          /> */}
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

        {/* Traffic chart & Pie Chart */}

        

        {/* Complex Table , Task & Calendar */}

        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          {/* <DailyTraffic /> */}
          {/* <PieChartCard /> */}
          
        </div>

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
      </div>
  </>}
    </div>
  );
};

export default Dashboard;
