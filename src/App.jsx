import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CardDemo } from './components/Card/App'
import Footer from './components/Footer/App'
import { HoverImageLinks } from './components/HoverImage/App'
import VideoFrame from './components/FrameEffect/App'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VideoFrame/>
      <HoverImageLinks/>
      <CardDemo/>
      <Footer/>
    </>
  )
}

export default App
