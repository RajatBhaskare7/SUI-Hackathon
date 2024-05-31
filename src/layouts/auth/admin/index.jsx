import Footer from "components/footer/FooterAuthDefault";
import authImg from "assets/img/auth/auth.png";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import routes from "routes.js";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import SignIn from "views/auth/admin/SignIn";
export default function Auth() {
  return (
    <div>
      <div >
       
      
                <SignIn />
               
            
      </div>
    </div>
  );
}
