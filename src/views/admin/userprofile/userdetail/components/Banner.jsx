import React from "react";
import avatar from "assets/img/avatars/admin.jpg";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";

const Banner = (props) => {
  const { user,investamount } = props;
  console.log(investamount);
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {user.username}
        </h4>
        <p className="text-base font-normal text-gray-600">{user.email}</p>
      </div>

      <div
      className="h-full w-full flex items-center justify-center mt-4"
   >
    <div className="h-1/2 w-1/4 flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
        
            <p className="ml-1 text-sm font-normal text-gray-600">Invested Amount</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            {
              investamount<=0 ? 0 : investamount
            }
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
           
            <p className="ml-1 text-sm font-normal text-gray-600">Withdrawal</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {
              user.withdrawal
            }
          </p>
        </div>
      </div>

   </div>
      
    </Card>
  );
};

export default Banner;
