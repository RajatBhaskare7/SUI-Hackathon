import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import Landing from "layouts/landing";
import Adminauth from "layouts/auth/admin";
import Userauth from "layouts/auth/user";
import ForgotPassword from "views/auth/user/Forgotpassword";
import ResetPassword  from "views/auth/user/Resetpassword";
import ForgotAdminPassword from "views/auth/admin/Forgotpassword";
import ResetAdminPassword from "views/auth/admin/Resetpassword";
import UserLayout from "layouts/user";
import Userdetail from "views/admin/userprofile/userdetail/index";
import AddTransaction from "views/admin/userprofile/transaction/index"
import AddInvestment from "views/admin/userprofile/investment/index.jsx"
import ProfitBooking from "views/admin/userprofile/profitbooking/index";
import ProtectAdmin from "utils/ProtectAdmin";
import ProtectUser from "utils/ProtectUser";
import { ZKButton } from "./utils/zklogin";  
import Editprofile from "views/user/profile/Editprofile/index";
import axios from "axios";


const App = () => {
  const [isAuth, setIsAuth] = React.useState(true);
  const [user, setUser] = React.useState(null);


 

  //write a nodejs server to get the data from the database and send it to the frontend
  
  return (
    <Routes>
      <Route path="auth/admin" element={<Adminauth />} />
      <Route path="auth/user" element={<Userauth />} />
      <Route path="auth/user/forgotpassword" element={<ForgotPassword />} />
      <Route path="auth/user/resetpassword/:id/:token" element={<ResetPassword/>}/>
      <Route path="auth/admin/forgotpassword" element={<ForgotAdminPassword />} />
      <Route path="auth/admin/resetpassword/:id/:token" element={<ResetAdminPassword/>}/>
      <Route path="admin/*" element={<ProtectAdmin component={AdminLayout} />} />
      {/* <Route path="rtl/*" element={<RtlLayout />} /> */}
      <Route path="/" element={<Landing/>} />
      <Route path="user/*" element={<ProtectUser component={UserLayout }/>} />
      <Route path="user/editprofile/:id" element={<ProtectUser component={Editprofile} />} />
      <Route path="/admin/userdetail/:id" element={<ProtectAdmin component={Userdetail}/>} />
      <Route path="/admin/addtransaction/:id" element={<ProtectAdmin component={AddTransaction}/>} />
      <Route path="/admin/addinvestment/:id" element={<ProtectAdmin component={AddInvestment}/>} />
      <Route path="/admin/profitbooking/:id" element={<ProtectAdmin component={ProfitBooking} />} />
     
      <Route path="/zklogin" element={<ZKButton />} />
      



      
    </Routes>
  );
};

export default App;
