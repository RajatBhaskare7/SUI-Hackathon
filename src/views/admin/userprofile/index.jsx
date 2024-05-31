import React from 'react'
import Table from './components/table'
import axios from 'axios';
import Banner from '../marketplace/components/Banner';
import { useState, useEffect } from 'react';
export default function Users() {
  const [user,setUser]=useState([]);
  const [loading,setLoading]=useState(true);
  const [currentinvesment,setCurrentInvestment]=useState([]);
  useEffect(() => {
    

    Promise.all([
      axios.get(process.env.REACT_APP_BASE_URL+'/investment/getcurrentinvestment'),
      axios.get(process.env.REACT_APP_BASE_URL+'/user/getuser')
    ])
    .then(([currentinvestmentRes,userResponse])=>{

    
     
      setUser(userResponse.data);
      setLoading(false);
    })
  }, []);
  return (
    <div className='mt-8'> 
     {
      loading ? <div
        class="h-screen flex justify-center items-center"
      > <dotlottie-player src="https://lottie.host/42efddd6-e327-4839-88ba-098a0a6ef3f8/sg3Bewaizz.json" background="transparent" speed="1" style={{
        height: "300px",
        width:"300px",
      }} loop autoplay></dotlottie-player></div> :<>
  <Banner  />
        <Table
        

        

         columnsData={
              [
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "username",
                  accessor: "username",
                },
                {
                  Header: "Phone",
                  accessor: "phone",
                },
                {
                  Header: "email",
                  accessor: "email",
                },
                {
                  Header: "Details",
                  accessor: "_id",
                }
              ]
            }
            tableData={
              user
              
            }
           
          />
  </>}
          

    </div>
  )
}
