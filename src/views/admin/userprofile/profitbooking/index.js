import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, Link } from "react-router-dom";
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
  const [open, setOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("Profit Booking");
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [investment, setInvestment] = useState({});
  const [profitBooking, setProfitBooking] = useState({
    coinname: "",
    coincode: "",
    investamount: "",
    investdate: "",
    coinquantity: "",
    coinprice: "",
    currentcoinprice: "",
    sellingcoinquantity: "",  // New field
    profit: "0",
    profitpercent: "0",
    uid: ""

  });

  useEffect(() => {
    console.log("id", id);
     
    Promise.all([
      axios.get(process.env.REACT_APP_BASE_URL + '/user/getuser'),
      axios.get(process.env.REACT_APP_BASE_URL + '/investment/getcurrentinvestment')
    ]).then(([userResponse, currInvestRes]) => {
      const userData = userResponse.data;
      const currInvestData = currInvestRes.data;
      console.log(currInvestData);
      console.log(userData);
      currInvestData.map((data) => {

        if (data._id === id) {
          setInvestment(data);
          const user_data = userData.filter((item) => item._id === data.uid);
          setUser(user_data[0]);
          console.log(data)
        }
      });
    })

  }, []);

  const handleProfitBooking = () => {
    const currentCoinPrice = parseFloat(profitBooking.currentcoinprice);
    const investedCoinPrice = parseFloat(investment.coinprice);
    const coinQuantity = parseFloat(investment.coinquantity);
    const sellingCoinQuantity = parseFloat(profitBooking.sellingcoinquantity);

    // Check if selling coin quantity is greater than coin quantity
    if (sellingCoinQuantity > coinQuantity) {
      alert("You cannot sell more coins than you have received.");
      return;
    }

    if (isNaN(currentCoinPrice) || isNaN(investedCoinPrice) || isNaN(coinQuantity) || isNaN(sellingCoinQuantity)) {
      setProfitBooking({
        ...profitBooking,
        profit: "0",
        profitpercent: "0"
      });
      return;
    }

    const profit = (currentCoinPrice - investedCoinPrice) * sellingCoinQuantity;
    const profitPercent = ((profit / (investedCoinPrice * sellingCoinQuantity)) * 100).toFixed(2);

    setProfitBooking({
      ...profitBooking,
      profit: profit.toFixed(2),
      profitpercent: profitPercent
    });
  };

  useEffect(() => {
    handleProfitBooking();
  }, [profitBooking.currentcoinprice, profitBooking.sellingcoinquantity]);  // Updated dependency array


  useEffect(() => {
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

  const submitprofitbooking = () => {
    axios
      .post(process.env.REACT_APP_BASE_URL + `/investment/addprofitbook/${investment._id}`, {
        coinname: investment.coinname,
        coincode: investment.coincode,
        investamount: investment.investamount,
        investdate: investment.investdate,
        coinquantity: investment.coinquantity,
        coinpriceaftersell: profitBooking.currentcoinprice,
        coinpricebeforesell: investment.coinprice,
        currentcoinprice: profitBooking.currentcoinprice,
        sellingcoinquantity: profitBooking.sellingcoinquantity,
        profit: profitBooking.profit,
        profitpercent: profitBooking.profitpercent,
        uid: investment.uid,
        profitdate: new Date()
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Profit booking successful");
        } else {
          alert("Profit booking failed");
        }
      });
  };

  return (
    <div className="h-full w-full">
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 `}>
          <div className="h-full">
            <Navbar
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <main className={`mx-[12px] h-full flex-none transition-all  text-white`}>
              <div class="px-2 py-12">
                <Banner />
                <button onClick={() => navigate(-1)}>Go back</button>
                <div class="flex flex-no-wrap items-start">
                  <div class="w-full">
                    <div class="py-4 px-2">
                      <div class=" rounded shadow mt-7 py-7"
                        style={{
                          backgroundColor: '#111C44'
                        }}
                      >
                        <div class="mt-10 px-7">
                          <div class="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7">
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
                              <p class="text-base  font-medium leading-none text-white-800">
                                Coin Name
                              </p>
                              <InputField
                                class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                                value={`${investment.coinname}`}
                                disabled
                              />
                            </div>
                            <div>
                              <p class="text-base font-medium leading-none text-white-800">
                                Coin Code
                              </p>
                              <InputField
                                class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                                value={`${investment.coincode}`}
                                disabled
                              />
                            </div>
                            <div>
                              <p class="text-base mb-3  font-medium leading-none text-white-800">
                                Invested Amount
                              </p>
                              <InputField
                                class="w-full py-4 border border-white-300 rounded outline-none focus:bg-white-50"
                                type="number"
                                value={investment.investamount}
                                disabled
                              />
                            </div>
                            <div>
                              <p class="text-base mb-3 font-medium leading-none text-white-800">
                                Investment Date
                              </p>
                              <InputField
                                class="w-full  mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                                value={
                                  investment.investdate
                                    ? new Date(investment.investdate).toLocaleDateString()
                                    : ""
                                }
                                disabled
                              />
                            </div>
                            <div>
                              <p class="text-base mb-3 font-medium leading-none text-white-800">
                                Investment Type
                              </p>
                              <InputField
                                class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                                value="SELL"
                                disabled
                              />
                            </div>
                            <div>
                              <p class="text-base  mb-3 font-medium leading-none text-white-800">
                                No. of coins received
                              </p>
                              <InputField
                                class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                                type="text"
                                value={investment.coinquantity}
                                disabled
                              />
                            </div>
                            <div>
                              <p class="text-base font-medium leading-none text-white-800">
                                Coin Price at Investment
                              </p>
                              <InputField
                                class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                                type="number"
                                value={investment.coinprice}
                                disabled
                              />
                            </div>
                            <div>
                              <p class="text-base font-medium leading-none text-white-800">
                                Current Coin Price
                              </p>
                              <InputField
                                class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                                type="number"
                                value={profitBooking.currentcoinprice}
                                onChange={(e) => setProfitBooking({ ...profitBooking, currentcoinprice: e.target.value })}
                              />
                            </div>
                            <div>
                              <p class="text-base  mb-3 font-medium leading-none text-white-800">
                                No. of coins selling
                              </p>
                              <InputField
                                class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                                type="text"
                                value={profitBooking.sellingcoinquantity}
                                onChange={(e) => setProfitBooking({ ...profitBooking, sellingcoinquantity: e.target.value })}
                              />
                            </div>
                            <div>
          <p class="text-base font-medium leading-none text-white-800">
            Profit
          </p>
          <InputField
            class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
            value={
              profitBooking.profit >= 0
                ? profitBooking.profit
                : `-${Math.abs(profitBooking.profit)}`
            }
            disabled
          />
        </div>
        <div>
          <p class="text-base font-medium leading-none text-white-800">
            Profit Percentage
          </p>
          <InputField
            class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
            value={
              profitBooking.profitpercent >= 0
                ? profitBooking.profitpercent
                : `-${Math.abs(profitBooking.profitpercent)}`
            }
            disabled
          />
        </div>
                          </div>
                          <div class="mt-7 flex justify-center">
                            <button
                              class="w-1/2 py-4 text-white font-medium rounded bg-gradient-to-r from-cyan-400 to-lightBlue-500"
                              onClick={()=>submitprofitbooking()}
                            >
                              Booked Profit
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
  );
}
