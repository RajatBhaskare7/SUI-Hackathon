import React, { useEffect, useState } from 'react'
import Tables from './components/Table'
import axios from 'axios';
export default function Market() {
    const [coindata,setCoindata]= useState([]);
    const [loading,setLoading] =useState(true);
   
    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h&locale=en')
        .then((res)=>{
            // setCoindata(res.data.data)
            console.log(typeof(res.data[0].price_change_percentage_24h))
            setCoindata(res.data)
            setLoading(false)
        })
    },[]);
  return (
    <div>
      
     
      {
      loading ? <div
        class="h-screen flex justify-center items-center"
      > <dotlottie-player src="https://lottie.host/42efddd6-e327-4839-88ba-098a0a6ef3f8/sg3Bewaizz.json" background="transparent" speed="1" style={{
        height: "300px",
        width:"300px",
      }} loop autoplay></dotlottie-player></div> : <div className="col-span-5 mt-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          {/* <Notification /> */}
          <Tables
            columnsData={
              [
                {
                  Header: "RANK",
                  accessor: "market_cap_rank",
                },
                {
                  Header: "LOGO",
                  accessor: "image",
                },
                {
                  Header: "COIN NAME",
                  accessor: "name",
                },
                {
                  Header: "SYMBOL",
                  accessor: "symbol",
                },
                {
                  Header: "PRICE(USD)",
                  accessor: "current_price",
                },
                {
                  Header: "PRICE CHANGE(24H)",
                  accessor: "price_change_percentage_24h",
                },
                {
                  Header: "24-Hour High",
                  accessor: "high_24h",
                },
                {
                  Header: "24-Hour Low",
                  accessor: "low_24h",
                }
                // {
                //   Header: "PROGRESS",
                //   accessor: "progress",
                // },
              ]
            }
            tableData={
             coindata
              
            }
          />
        </div>
}
    </div>
  )
}
