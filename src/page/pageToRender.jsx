import React from 'react'
import ImageGenerator from '../components/text-to-image'
import { ScrollBar } from '../components/navbar'
import { useState } from 'react'
const PageToRender = () => {
    const [navOpen, setNavOpen]=useState(false)
  return (
    <>
        {navOpen
        ? 
        <ScrollBar/>
        : 
        <ImageGenerator/>
        }   
    </>
  )
}

export default PageToRender