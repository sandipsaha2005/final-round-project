import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PageToRender from './page/pageToRender'
function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <PageToRender/>
    </>
  )
}

export default App
