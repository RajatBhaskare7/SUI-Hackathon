import axios from "axios";
import Card from "components/card";
import React from "react";
import { Link,useParams } from "react-router-dom";
const General = (props) => {
  const { user } = props;
  const { id } = useParams();
  const [withdrawal, setWithdrawal] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    setWithdrawal(user.withdrawal);
  }, [user]);
  console.log(user)
  const handlewithdrawal = () => {
    
    if(withdrawal<user.withdrawal){
      alert("Withdrawal cannot be less than the previous withdrawal")
      return;
    }
    if(withdrawal>7){
      alert("Withdrawal cannot be more than 7")
      return;
    }
    user.withdrawal = withdrawal;
    axios.post (process.env.REACT_APP_BASE_URL + `/user/updateuser/${id}`, 
      user
    )
      .then((res) => {
        console.log(res.data);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
      <div 
                  class="flex flex-row justify-end items-center gap-4"
                >{showModal ? (
                  <>
                    <div
                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                      style={{
                        backgroundColor: "#0C1539",
                      }}
                    >
                      <div className="relative w-auto my-6 mx-auto max-w-3xl"
                          style={{
                            backgroundColor: "#0C1539",
                          }} 
                      >
                        {/*content*/}
                        <div  style={{
                            backgroundColor: "#0F193F",
                          }} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full ">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 ">
                            <h3 className="text-3xl font-semibold">
                              Add Withdrawal
                            </h3>
                            
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <input
                              type="number"
                              placeholder="Enter Withdrawal Number"
                              value={withdrawal}
                              onChange={(e) => {
                                setWithdrawal(e.target.value);
                              }
                              }
                              maxlength = "1"
                              min="0" max="7"
                              style={{
                                backgroundColor: "#0C1539",
                              }}
                              className="w-full p-2 border border-gray-200 rounded"
                            />
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6  rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                            <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => handlewithdrawal()}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
                 
                 <button
                 onClick={() => setShowModal(true)}
                  class="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[174px] w-full"
                >
                  Add Withdrawal
                </button>
               
                 <Link to={`/admin/addtransaction/${id}`}>
                 <button
                  class="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[174px] w-full"
                >
                  Add Transcation
                </button>
                 </Link>
                 <Link to={`/admin/addinvestment/${id}`}>
                <button
                  class="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[174px] w-full"
                >
                 Add Investment
                </button>
                </Link>
                  
               </div>
      
        <p className="mt-2 px-2 text-base text-gray-600">
       
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Name</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {user.name}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Phone Number</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {
              user.phone
            }
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Address</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {
              user.address
            }
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Join Date</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {
              new Date(user.JoinDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })

            }
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Date of Birth</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {
               new Date(user.dob).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            }
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Balance</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
           {user.balance} 
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
