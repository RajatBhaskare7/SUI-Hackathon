import Banner from "./components/Banner";
import General from "./components/General";

import Tables from "./components/Tables";
import {useState, useEffect } from "react";
import axios from "axios";

const ProfileOverview = () => {
  const [user, setUser] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    document.title = "Profile Overview | User";
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    axios.get(process.env.REACT_APP_BASE_URL+"/admin/getadmin").then((res) => {
     const user = res.data;
     
     user.map((item) => {
        if (item._id === id) {
          console.log(item);
          setUser(item);
          setLoading(false);
        }
        
      }
      );

  });
 
  }, []);

  return (
    <div className="flex w-full flex-col gap-5"
      
    >
       {
      loading ? <div
        class="h-screen flex justify-center items-center"
      > <dotlottie-player src="https://lottie.host/42efddd6-e327-4839-88ba-098a0a6ef3f8/sg3Bewaizz.json" background="transparent" speed="1" style={{
        height: "300px",
        width:"300px",
      }} loop autoplay></dotlottie-player></div> :<>
  <div className="w-full mt-3  h-fit flex-col">
        <div className=" flex  justify-center col-span-4 lg:!mb-0">
          <Banner user={user}  />
        </div>

        {/* <div className="col-span-3 lg:!mb-0">
          <Storage />
        </div> */}


      </div>
      {/* all project & ... */}

      <div className="h-full gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <General user={user} />
        </div>
        {/* <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
        <Project /> 
        </div> */}

       
      </div>
  </>}
    </div>
  );
};

export default ProfileOverview;
