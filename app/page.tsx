import HeroSection from '@/components/home/HeroSection'
import AboutUs from '@/components/about/AboutUs'
import React from 'react'

export default function Home(){
  return (
    <>
      <HeroSection/>
       <div id="about-us">
        <AboutUs />
      </div>
    </>
  )
}
