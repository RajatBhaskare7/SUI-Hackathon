import React from 'react'
import Heading from '../components/Heading'
import { useState } from 'react'
import axios from 'axios'
export default function Contact() {
    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [message, setmessage] = useState('')
    const [subject,setSubject] =useState('');


    const handlemail = () => {
      if(email === '' || name === '' || message === ''){
        alert('Please fill all the fields')
        return
      }
      console.log(process.env.REACT_APP_BASE_URL)
      axios.post(process.env.REACT_APP_BASE_URL+'/send-email', {
        email: email,
        name: name,
        message: message,
        subject:subject
      }).then((response) => {
        if(response.status === 200){
          alert('Message sent successfully')
          setemail('')
          setname('')
          setmessage('')
        }
      }).catch((error) => {
        console.log(error)
      })
        
    } 
  return (
    <div>
   
        <Heading
        
        className="text-center"
        heading=""
        subHeading="Contact Us"
      />
        <>
  
  <div
    style={{
        backgroundColor:'#2D2A3B'
    }}
    id="CONTACT"
  className="max-w-screen-xl mt-14 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 rounded-lg shadow-lg">
    <div className="flex flex-col ">
      <div>
        <h2 className="text-4xl mt-8 lg:text-5xl  uppercase  font-bold leading-tight">
          Let's invest together write us your requirements
        </h2>
       
      </div>
      <div className="mt-8 text-center">

<dotlottie-player src="https://lottie.host/9dd81bbe-ee7f-4d93-8c51-28ead89e9a23/e9nyUEEM9E.json" background="transparent" speed="1" style={{
        height: "300px",
        width:"300px",
}} loop autoplay></dotlottie-player>
      </div>
    </div>
    <div className="">
      <div>
        <span className="uppercase text-sm text-white-600 font-bold">
          Full Name
        </span>
        <input
          className="w-full  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="text"
          placeholder=""
          style={{
            backgroundColor: "#36314a",
            color:'#fff'
          }}
          onChange={(e)=>{
            setname(e.target.value)
          }}

        />
      </div>
      <div className="mt-8">
        <span className="uppercase text-sm text-gray-600 font-bold">Subject</span>
        <input
          className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="text"
          style={{
            backgroundColor: "#36314a",
            color:'#fff'
          }}
          onChange={(e)=>{
            setSubject(e.target.value)
          }}
        />
      </div>
      <div className="mt-8">
        <span className="uppercase text-sm text-gray-600 font-bold">Email</span>
        <input
          className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="email"
          style={{
            backgroundColor: "#36314a",
            color:'#fff'
          }}
          onChange={(e)=>{
            setemail(e.target.value)
          }}
        />
      </div>
      <div className="mt-8">
        <span className="uppercase text-sm text-gray-600 font-bold">
          Message
        </span>
        <textarea
          className="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          defaultValue={""}
          style={{
            backgroundColor: "#36314a",
            color:'#fff'
          }}
          onChange={(e)=>{
            setmessage(e.target.value)
          }}
        />
      </div>
      <div className="mt-8">
        <button
            style={{
                backgroundColor: "#3B1DFF",
                color:'#fff'
                
            }}
            onClick={() => {
                handlemail()
            }}
        className="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
          Send Message
        </button>
      </div>
    </div>
  </div>
</>


    </div>
  )
}
