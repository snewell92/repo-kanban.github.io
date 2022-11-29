import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  function increment() { setCount(count + 1); };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold w-full">Vite + React + Typescript + TailwindCSS + DaisyUI</h1>
          <button className="mt-8 btn btn-primary" onClick={increment}>Count is {count}</button>
          <p className="mt-4 text-teal-300">Rocket to the Moon!</p>
        </div>
      </div>
    </div>
  )
}

export default App
