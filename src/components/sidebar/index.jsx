/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";


import adminroutes from "routes.js";
import Img from './../../assets/img/dashboards/Titan-03.png'
const Sidebar = ({ open, onClose,role }) => {

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col w-60  bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      {/* Logo */}
      <div className="flex items-center justify-center mt-5">
        <img src={Img} alt="logo" style={{
          width: '150px',
        }} />
      </div>
      
      <div class=" mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links role={role} routes={adminroutes} />
        
      </ul>

      

      {/* Free Horizon Card */}
    

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
