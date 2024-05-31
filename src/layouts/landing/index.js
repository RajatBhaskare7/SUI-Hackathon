import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header';
import MainSection from './sections/MainSection';
import AboutSection from './sections/AboutSection';
import CollectionSection from './sections/CollectionSection';
import FAQSection from './sections/FAQSection';
import FeaturesSection from './sections/FeaturesSection';
import FooterSection from './sections/FooterSection';
import Popularity from './sections/Popularity';
import PromoSection from './sections/PromoSection';
import axios from 'axios';
import Contact from './sections/Contactus';
import { useEffect } from 'react';  

export default function Landing() {
  useEffect(() => {
    // axios.get('https://newsdata.io/api/1/news?apikey=pub_39727a8546a6b1af19437681c6e4c2868ea73&q=crypto ').then((res)=>{
    //   console.log(res.data)
    // })]
    console.log('hello')
  }
    ,[]);

  return (
    <main className="app-bg min-h-[100dvh] max-w-full overflow-x-hidden scroll-container"
    
    >
      <section className="center col mx-auto flex max-w-6xl gap-12 px-4 pb-8 md:gap-20 xl:px-0">
        {/* <div id={APP_BODY_ID} className="fixed inset-0 light round-gradient" /> */}
        <Header />
        <MainSection />
        <AboutSection />
        <FeaturesSection />
        
        <Popularity />
        <FAQSection />
        {/* <CollectionSection /> */}
        <Contact />
        
        
        
        {/* <PromoSection /> */}
        <FooterSection />
      </section>
    </main>
  );
}
