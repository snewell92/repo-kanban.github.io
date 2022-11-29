import { useState } from 'react'
import { useEffect } from 'react'

// Theme provider is the HTML DOM Node's data-theme attribute
const $htmlElement = document.documentElement;

function setTheme(themeName: string) {
  $htmlElement.setAttribute('data-theme', themeName);
}

function App() {
  const [count, setCount] = useState(0);
  const [darkThemeOn, setDarkThemeOn] = useState(true);

  function increment() { setCount(count + 1); };
  function toggleDarkTheme() {
    setDarkThemeOn(!darkThemeOn);
  };

  useEffect(
    () => setTheme(darkThemeOn ? "dark": "light"),
    [darkThemeOn]
  );

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 w-fit">
        <input title="Toggle Dark/Light Themes" type="checkbox" className="toggle" checked={darkThemeOn} onChange={toggleDarkTheme} />
      </div>
      <div className="hero min-h-screen bg-neutral">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl tracking-tighter font-bold w-full text-primary font-interBold">Vite + React + Typescript + TailwindCSS + DaisyUI</h1>
            <button className="mt-8 btn btn-primary font-inter tracking-tightest" onClick={increment}>Count is {count}</button>
            <p className="mt-4 text-secondary tracking-tightest">Rocket to the Moon!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
