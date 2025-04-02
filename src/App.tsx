import { useState } from 'react'
import DisplayWeather from './components/DisplayWeather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <DisplayWeather />
      </div>
    </>
  )
}

export default App
