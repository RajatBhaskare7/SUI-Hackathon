import React, { useEffect,useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  Link,
} from "react-router-dom";
import Navbar from "components/navbar";
import { MdFileUpload } from "react-icons/md";
import routes from "routes.js";
import InputField from "components/fields/InputField";
import Upload from "../components/Upload";
import axios from "axios";
import Card from "components/card";
import image2 from "assets/img/profile/image1.png";
export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Edit Profile");
  const [user, setUser] = React.useState([]);
  //user state data
  const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [aadharCardFilefront, setAadharCardFilefront] = useState("");
    const [aadharCardFileback, setAadharCardFileback] = useState("");
    const [panCardFile, setPanCardFile] = useState("");
    const [photoFile, setPhotoFile] = useState("");
    const [accountfile, setAccountfile] = useState("");

    const [demo, setDemo] = useState(
      {
        aadharcardback: "",
        aadharcardfront: "",
        photo: "",
        pancard: "",
      }
    );


  const navigate = useNavigate();
  const { id } = useParams();

 
  React.useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL+`/user/getuser/`).then((response) => {
      const res = response.data.filter((user) => user._id === id);
      console.log(res);
      setUser(res[0]);
      setEmail(res[0].email);
        setName(res[0].name);
        setUsername(res[0].username);
        setPhone(res[0].phone);
        setAddress(res[0].address);
        setDob(res[0].dob);
        setAccountHolderName(res[0].accountHolderName);
        setIfscCode(res[0].ifscCode);
        setAccountNumber(res[0].accountNumber);
        setAadharCardFilefront(res[0].aadharcardfront);
        setPanCardFile(res[0].pancard);
        setPhotoFile(res[0].photo);
        setAadharCardFileback(res[0].aadharcardback);
        setDemo({
          aadharcardback:process.env.REACT_APP_BASE_URL+ '/'+res[0].aadharcardback,
          aadharcardfront:process.env.REACT_APP_BASE_URL+'/'+ res[0].aadharcardfront,
          photo: process.env.REACT_APP_BASE_URL+'/'+ res[0].photo,
          pancard: process.env.REACT_APP_BASE_URL+'/'+ res[0].pancard,
        });
    });

  }, []);

  React.useEffect(() => {
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
  const handleaadharcardfront = (files) => {
    // Convert file to base64
    console.log(files);
    // alert("file upl4oaded");
    setAadharCardFilefront(files);
    setDemo((prevState) => ({
      ...prevState,
      aadharcardfront: URL.createObjectURL(files),
    }));
    
    setUsername(URL.createObjectURL(files));
    
  
    
};
  const handlePancard = (files) => {
    //convert file to base64
    console.log(files);
    // alert("file uploa1ded");
    setPanCardFile(files);
    if(files.length!== 0){
      setDemo((prevState) => ({
        ...prevState,
        pancard: URL.createObjectURL(files),
      }));
    }
    
    

    };
    const handlePhoto = (file) => {
      // alert("file uplo2aded");
      setPhotoFile(file);
      if(file.length!== 0){
        setDemo((prevState) => ({
          ...prevState,
          photo: URL.createObjectURL(file),
        }));
      }
    };
    const handleaadharcardback = (files) => {
      // alert("file upload3ed");
        //convert file to base64
        console.log(files);
        setAadharCardFileback(files);
        if(files.length!== 0){
          setDemo((prevState) => ({
            ...prevState,
            aadharcardback: URL.createObjectURL(files),
          }));
        }
       
    };
  const handleUpdateuser = () => {

    console.log("update user");
    const data ={
        name:name,
        username:username,
        email:email,
        phone:phone,
        address:address,
        dob:dob,
        // accountHolderName:accountHolderName,
        // ifscCode:ifscCode,
        // accountNumber:accountNumber,
        aadharcardfront:aadharCardFilefront,
        pancard:panCardFile,
        aadharcardback:aadharCardFileback,
        photo:photoFile,
        // accountfile:accountfile
    }
    axios.post(process.env.REACT_APP_BASE_URL+`/user/updateuser/${id}`,data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
    }}
        
    ).then((response) => {
        if(response.status === 200){
           alert("User updated successfully");
           navigate("/user/profile");
        }
        else
        {
            alert("User not updated");
        }

    });
  }

  return (
    <div className=" h-full w-full">
      {/* <Sidebar open={open} onClose={() => setOpen(false)} /> */}

      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 `}>
          {/* Routes */}
          <div className="h-full">
            <Navbar
              //   onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />

            {/* Main Content */}
            <main
              className={`mx-[12px] h-full flex-none text-white  transition-all`}
            >
              {/* Routes */}

              <div class="px-2 py-12">
                <button 
                
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(-1)}>Go back</button>
                <div class="flex-no-wrap flex items-start">
                  <div class="w-full">
                    <div class="py-4 px-2">
                      <div
                        class=" mt-7 rounded py-7 shadow"
                        style={{
                          backgroundColor: "#111C44",
                        }}
                      >
                        <div class="mt-10 px-7">
                          <div class="mt-7 grid w-full grid-cols-1 gap-7 md:grid-cols-1 lg:grid-cols-2">
                           
                            <div>
                              <p class="text-base font-medium leading-none ">
                                Name
                              </p>

                              <InputField
                                class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                value={user.name}
                                onChange={(e) => setName(e.target.value)}
                                disabled
                              />
                            </div>
                            <div>
                              <p class="text-white-800 text-base font-medium leading-none">
                                Username
                              </p>
                              <InputField
                                class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                value={`${user.username}`}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled
                              />
                            </div>
                            <div>
                              <p class="text-white-800 text-base font-medium leading-none">
                                email
                              </p>
                              <InputField
                                class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                value={`${user.email}`}

                                disabled
                              />
                            </div>
                            <div>
                              <p class="text-white-800 text-base font-medium leading-none">
                                Phone
                              </p>
                              <InputField
                                class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                value={`${phone}`}
                                onChange={(e) => setPhone(e.target.value)}
                                type="number"
                              />
                            </div>
                            <div>
                              <p class="text-white-800 text-base font-medium leading-none">
                                Address
                              </p>
                              <InputField
                                class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                value={`${user.address}`}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                            </div>
                            <div>
                              <p class="text-white-800 text-base font-medium leading-none">
                                DOB
                              </p>
                              <InputField
                                class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                value={`${user.dob}`}
                                onChange={(e) => setDob(e.target.value)}
                                type="date"
                              />
                            </div>
                            
                            
                            
                            {/* <div>
                              <p class="text-white-800 text-base font-medium leading-none">
                                Account Number
                              </p>
                              <InputField
                                class="border-white-300 focus:bg-white-50 mt-4 w-full rounded border p-3 outline-none"
                                value={`${user.address}`}
                                onChange={(e) => setAccountNumber(e.target.value)}
                              />
                            </div> */}
                            <div>

                              <Card className="grid h-full w-full grid-cols-1  rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
                                <div className=" rounded-xl bg-lightPrimary text-center dark:!bg-navy-700 2xl:col-span-8">
                                  <label className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                                    <input
                                      type="file"
                                      style={{ display: "none" }}
                                      accept=".png, .jpg, .jpeg"
                                      name="aadharcardfront"
                                      onChange={(e) => handleaadharcardfront(e.target.files[0])}
                                    />
                                    <MdFileUpload className="cursor-pointer text-[40px] text-brand-500 dark:text-white" />
                                    <h4 className="center cursor-pointer text-lg font-bold text-brand-500 dark:text-white">
                                      {
                                        
                                        
                                        

                                        "Upload your AadharCard Front"
                                        }
                                    </h4>
                                    <p className="mt-2 text-sm font-medium text-gray-600">
                                      PNG, JPG are allowed
                                    </p>
                                  </label>
                                </div>

                                <div className="col-span-3 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
                                <img
    className="h-[95px] w-[95px] rounded-lg"
    src={
        
           demo.aadharcardfront
    }
    alt=""
/>
                                </div>
                              </Card>
                            </div>
                            <div>
                            <Card className="grid h-full w-full grid-cols-1  rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
                                <div className=" rounded-xl bg-lightPrimary text-center dark:!bg-navy-700 2xl:col-span-8">
                                  <label className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                                    <input
                                      type="file"
                                      style={{ display: "none" }}
                                      accept=".png, .jpg, .jpeg"
                                      name="pancard"
                                      onChange={(e) => handlePancard(e.target.files[0])}
                                    />
                                    <MdFileUpload className="cursor-pointer text-[40px] text-brand-500 dark:text-white" />
                                    <h4 className="center cursor-pointer text-lg font-bold text-brand-500 dark:text-white">
                                      {
                                        
                                            "Upload your PanCard"

                                      }
                                    </h4>
                                    <p className="mt-2 text-sm font-medium text-gray-600">
                                      PNG, JPG are allowed
                                    </p>
                                  </label>
                                </div>

                                <div className="col-span-3 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
                                  <img
                                    className="h-[95px] w-[95px] rounded-lg"
                                    src={
                                      demo.pancard
                                    }
                                    alt=""
                                  />
                                </div>
                              </Card>
                            </div>
                            <div>
                            <Card className="grid h-full w-full grid-cols-1  rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
                                <div className=" rounded-xl bg-lightPrimary text-center dark:!bg-navy-700 2xl:col-span-8">
                                  <label className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                                    <input
                                      type="file"
                                      style={{ display: "none" }}
                                      accept=".png, .jpg, .jpeg"
                                      name="photo"
                                      onChange={(e) => handlePhoto(e.target.files[0])}
                                    />
                                    <MdFileUpload className="cursor-pointer text-[40px] text-brand-500 dark:text-white" />
                                    <h4 className="center cursor-pointer text-lg font-bold text-brand-500 dark:text-white">
                                     {"Upload your Photo"
                                     }
                                    </h4>
                                    <p className="mt-2 text-sm font-medium text-gray-600">
                                      PNG, JPG are allowed
                                    </p>
                                  </label>
                                </div>

                                <div className="col-span-3 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
                                  <img
                                    className="h-[95px] w-[95px] rounded-lg"
                                    src={
                                      demo.photo
                                    }
                                    alt=""
                                  />
                                </div>
                              </Card>
                            </div>
                            <div>
                            <Card className="grid h-full w-full grid-cols-1  rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
                                <div className=" rounded-xl bg-lightPrimary text-center dark:!bg-navy-700 2xl:col-span-8">
                                  <label className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                                    <input
                                      type="file"
                                      style={{ display: "none" }}
                                      accept=".png, .jpg, .jpeg"
                                      name="aadharcardback"

                                      onChange={(e) => {
                                        handleaadharcardback(e.target.files[0])
                                      }}
                                    />
                                    <MdFileUpload className="cursor-pointer text-[40px] text-brand-500 dark:text-white" />
                                    <h4 className="center cursor-pointer text-lg font-bold text-brand-500 dark:text-white">
                                     {
                                       "Upload your AadharCard Back"
                                     }
                                    </h4>
                                    <p className="mt-2 text-sm font-medium text-gray-600">
                                      PNG, JPG are allowed
                                    </p>
                                  </label>
                                </div>

                                <div className="col-span-3 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
                                  <img
                                    className="h-[95px] w-[95px] rounded-lg"
                                    src={
                                      demo.aadharcardback
                                    }
                                    alt=""
                                  />
                                </div>
                              </Card>
                            </div>
                     
                          </div>
                          
                        </div>
                        <div className="flex items-center justify-center">
                          <button onClick={handleUpdateuser} class="linear mt-7 flex w-1/2 items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                            Update Profile
                          </button>
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
