import React from 'react'
import ImageGenerator from '../components/text-to-image'
import { CardDemo } from '../components/Card/App'
import Footer from '../components/Footer/App'
import HorizontalScrollCarousel from '../components/HorizentralScroll/app'
const PageToRender = () => {
    const [navOpen, setNavOpen]=useState(false)
  return (
    <div>
        <CardDemo/>
        <HorizontalScrollCarousel/>
        <Footer/>
        <ImageGenerator/>
        }   
    </>
  )
}

export default PageToRender