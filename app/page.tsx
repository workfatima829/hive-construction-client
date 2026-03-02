import HeroSection from '@/components/home/HeroSection'
import AboutUs from '@/components/about/AboutUs'
import React from 'react'
import Navbar from '@/components/layout/Navbar'

export default function Home(){
  return (
    <>
      <Navbar />
      <HeroSection/>
       <div id="about-us">
        <AboutUs />
      </div>
    </>
  )
}
