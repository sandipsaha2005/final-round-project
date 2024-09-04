import React from 'react'
import ImageGenerator from '../components/text-to-image'
import { CardDemo } from '../components/Card/App'
import Footer from '../components/Footer/App'
import HorizontalScrollCarousel from '../components/HorizentralScroll/app'
import VerticalAccordion from '../components/Features/app'
// import { PlaceholdersAndVanishInputDemo } from '../components/Input/app'
const PageToRender = () => {
  return (
    <div>
        <CardDemo/>
        <HorizontalScrollCarousel/>
        <Footer/>
        <ImageGenerator/>
        <VerticalAccordion/>
        {/* <PlaceholdersAndVanishInputDemo/> */}
    </div>
  )
}

export default PageToRender