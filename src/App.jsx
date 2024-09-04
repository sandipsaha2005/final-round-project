import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CardDemo } from './components/Card/App'
import Footer from './components/Footer/App'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <CardDemo/>
      <Footer/>
    </>
  )
}

export default App
