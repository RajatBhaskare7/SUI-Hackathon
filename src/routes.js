import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import UsersDetail from "views/admin/userprofile";
import AddTransaction from "views/admin/userprofile/transaction/index.js"
import AddInvestment from "views/admin/userprofile/investment/index.jsx"

//user imports
import UserDashboard from "views/user/default";
// import UserMarketplace from "views/user/marketplace";
import UserProfile from "views/user/profile";
import UserTables from "views/user/tables"; 
import Market from "views/admin/market";
// Auth Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  {
    name: "History",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: 
    <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "user-detail",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <UsersDetail />,
  },


  {
    name: "Dashboard",
    layout: "/user",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <UserDashboard/>,
  },
 
  // {
  //   name: "Data Tables",
  //   layout: "/user",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <UserTables />,
  // },
  {
    name: "Profile",
    layout: "/user",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <UserProfile />,
  },
  {
    name:"Cryptocurrencies",
    layout: "/user",
    path: "marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Market/>,
  }
  ,{
    name:"Cryptocurrencies",
    layout: "/admin",
    path: "marketplace",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Market/>,
  }



];
export default routes;
