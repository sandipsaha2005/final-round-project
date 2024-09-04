import React from 'react'
import ImageGenerator from '../components/text-to-image'
import { CardDemo } from '../components/Card/App'
import Footer from '../components/Footer/App'
const PageToRender = () => {
  return (
    <div>
        <CardDemo/>
        <Footer/>
        <ImageGenerator/>
    </div>
  )
}

export default PageToRender