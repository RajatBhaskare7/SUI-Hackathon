import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { Link } from "react-router-dom";
import axios from "axios";
import InputField from "components/fields/InputField";
import Card from "components/card";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

const Table = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  
  // Create state to store table data
  const [data, setData] = useState(tableData);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // initial page size and index
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = tableInstance;

  useEffect(() => {
    // Update data state when tableData prop changes
    setData(tableData);
  }, [tableData]);

  const handleAddUser = () => {
    if (password === confirmPassword) {
      const user = {
        name: name,
        username: username,
        email: email,
        phone: phone,
        password: password,
      };
      axios
        .post(process.env.REACT_APP_BASE_URL+"/auth/user/register", user)
        .then((response) => {
          if (response.status === 200) {
            alert("User added successfully");
            setShowModal(false);
            // Update data state with the new user
            setData([...data, user]);
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      alert("Password does not match");
    }
  };

  
  const handleuserdelete = async (id) => {
    try {
      // Fetch current investments of the user
      const response = await axios.get(process.env.REACT_APP_BASE_URL+'/investment/getcurrentinvestment');
      if (response.status === 200) {
        const investments = response.data;
        
        // Filter investments by user ID
        const userInvestments = investments.filter((inv) => inv.uid === id);
        
        // If user has investments, show confirmation dialog
        if (userInvestments.length > 0) {
          const confirmed = window.confirm("User has ongoing investment, are you sure you want to delete this user?");
          if (confirmed) {
            // If user confirms, delete the user
            await deleteUser(id);
          }
        } else {
          // If user has no investments, directly delete the user
          const confirmed = window.confirm("Are you sure you want to delete this user?");
          if (confirmed) {
            await deleteUser(id);
          }
        }
      }
    } catch (error) {
      alert(error.response.data);
    }
  }
  
  const deleteUser = async (id) => {
    try {
      // Delete the user
      const response = await axios.delete(process.env.REACT_APP_BASE_URL+"/user/deleteuser/"+id);
      if (response.status === 200) {
        // Update data state by removing the deleted user
        setData(data.filter((user) => user._id !== id));
        alert("User deleted successfully");
      }
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <Card extra={"w-full h-full p-4 mt-8 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          User Details
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add User
        </button>
        {showModal ? (
        <>
          <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={{
              backgroundColor: "#0B1437",
             
           
            }}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl"
              style={{
                backgroundColor: "#111C44",
                width: "100%",
                padding: "20px",
              }}  
            >
              {/*content*/}
              <div className=" relative flex flex-col w-full ">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add User
                  </h3>
                
                </div>
                {/*body*/}
                <div className="relative ">
                <div
                  class="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7"
                >
               
                  
                  <div>
                    <p class="text-base font-medium leading-none ">
                     Full Name
                    </p>

                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      onChange={(e) => setName(e.target.value)}


                    
                    />
                   
                  </div>
                  <div>
                    <p class="text-base font-medium leading-none text-white-800">
                      Username
                    </p>
                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      onChange={(e) => setUsername(e.target.value)} 
                    />
                   
                  </div>
                  <div>
                    <p class="text-base font-medium leading-none text-white-800">
                      email
                    </p>
                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                   
                  </div>
                 
                  <div>
                    <p class="text-base font-medium leading-none text-white-800">
                    Phone Number
                    </p>
                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                   
                  </div>
                  <div >
                    <p class="text-base  font-medium leading-none text-white-800">
                      Password
                    </p>
                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                   
                  </div>
                  <div >
                    <p class="text-base  font-medium leading-none text-white-800">
                     Confirm Password
                    </p>
                    <InputField
                      class="w-full p-3 mt-4 border border-white-300 rounded outline-none focus:bg-white-50"
                      type="password" 
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                   
                  </div>
                </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end mt-10 rounded-b">
                  <button
                    className="text-red-500  font-bold uppercase px-6 py-2 text-sm outline-nonemr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white  font-bold uppercase text-sm px-6 py-3 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleAddUser()}
                  >
                    Create User
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </>
      ) : null}
      </div>

      <div className="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let cellData = "";
                    if (cell.column.Header === "Name") {
                      cellData = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "username") {
                      cellData = (
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full text-xl`}>
                            {cell.value === "Approved" ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : cell.value === "Disable" ? (
                              <MdCancel className="text-red-500" />
                            ) : cell.value === "Error" ? (
                              <MdOutlineError className="text-orange-500" />
                            ) : null}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "Phone" || cell.column.Header === "email") {
                      cellData = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "Details") {
                      cellData = (
                        <div>
                        <Link
                          to={`/admin/userdetail/${cell.value}`}
                          key={index}
                        >
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          >
                            Detail
                          </button>
                         </Link>
                          <button
                          type="button"
                          onClick={()=>handleuserdelete(cell.value)}
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                        >
                          Delete
                        </button>
                        </div>
                       
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {cellData}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </strong>{" "}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </Card>
  );
};

export default Table;
