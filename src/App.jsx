import './App.css'
import { Demo } from "./Components/Demo";
import { Hero } from "./Components/Hero";

function App() {

  return (
    <main className='w-full bg-gray-800 min-h-screen'>
      <div className="main">
        <div className="gradient"/>
      </div>

      <div className="app">
        <Hero/>
        <Demo/>
      </div>

    </main>
  )
}

export default App
