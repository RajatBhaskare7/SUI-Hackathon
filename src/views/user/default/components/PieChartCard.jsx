import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";
import { useState, useEffect } from "react";

const PieChartCard = (props) => {
  const { totalinvested, investment } = props;
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [hasInvestments, setHasInvestments] = useState(false);

  useEffect(() => {
    if (investment && investment.length > 0) {
      // Calculate total investment for each coin
      const coinInvestments = {};
      investment.forEach((item) => {
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
      Object.keys(coinInvestments).forEach(
        (coin) =>
          (percentages[coin] = (coinInvestments[coin] / totalInvestmentAmount) * 100)
      );

      // Sort the coins based on their percentages in descending order
      const sortedCoins = Object.keys(percentages).sort(
        (a, b) => percentages[b] - percentages[a]
      );

      // Set the series and labels
      setSeries(sortedCoins.map((coin) => percentages[coin]));
      setLabels(sortedCoins.map((coin) => `${coin} (${percentages[coin].toFixed(2)}%)`));
      setHasInvestments(true);
    } else {
      setHasInvestments(false);
    }
  }, [investment]);

  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Assets Allocation
          </h4>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        {hasInvestments ? (
          <PieChart
            options={{
              labels: labels,
              colors: ["#9332DA","#13A8EB","#9792E3","#FFC145","#AF4D98","#9C3848","#AF4D98","#A691DA","#353981", "#DB43DB", "#EFF4FB"], // Add more colors if needed
              chart: {
                width: "50px",
              },
              states: {
                hover: {
                  filter: {
                    type: "none",
                  },
                },
              },
              legend: {
                show: false,
              },
              dataLabels: {
                enabled: false,
              },
              hover: { mode: null },
              plotOptions: {
                donut: {
                  expandOnClick: true,
                  donut: {
                    labels: {
                      show: false,
                    },
                  },
                },
              },
              fill: {
                colors: ["#9332DA","#13A8EB","#9792E3","#FFC145","#AF4D98","#9C3848","#AF4D98","#A691DA","#353981", "#DB43DB", "#EFF4FB"],
              },
              tooltip: {
                enabled: true,
                theme: "dark",
                style: {
                  fontSize: "12px",
                  fontFamily: undefined,
                  backgroundColor: "#973646",
                  
                },
              },
            }}
            series={series}
          />
        ) : (
          <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
            No investments made yet.
          </p>
        )}
      </div>
    </Card>
  );
};

export default PieChartCard;
