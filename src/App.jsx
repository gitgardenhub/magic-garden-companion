import { useState } from 'react'
import './App.css'
import CropDatabase from './CropDatabase'
import CropCalculator from './CropCalculator'
function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app">
      <header className="header">
        <div
          className="logo"
          onClick={() => setCurrentPage('home')}
          style={{ cursor: 'pointer' }}
        >
          🌸 Magic Garden Companion
        </div>
<button
  className="home-button"
  onClick={() => setCurrentPage('home')}
>
  🏡 Home
</button>
       
      </header>

      {currentPage === 'home' && (
        <main>
          <section className="hero">
            <p className="eyebrow">YOUR LITTLE CORNER OF MAGIC</p>

            <h1>
              Grow Something
              <br />
              <span>Wonderful.</span>
            </h1>

            <p className="intro">
              Your magical guide to growing, harvesting,
              and getting the most out of your garden.
            </p>

            <div className="hero-buttons">
  <button
    className="primary-button"
    onClick={() => setCurrentPage('database')}
  >
    🌱 Crop Database
  </button>

  <button
    className="primary-button"
    onClick={() => setCurrentPage('calculator')}
  >
    💰 Value Calculator
  </button>

  <button
    className="primary-button"
    onClick={() => setCurrentPage('planner')}
  >
    🌷 Garden Planner — Coming Soon
  </button>
</div>
          </section>

          
        </main>
      )}

      {currentPage === 'database' && <CropDatabase />}

     {currentPage === 'calculator' && <CropCalculator />}

      {currentPage === 'planner' && (
        <h2 style={{ textAlign: 'center', padding: '100px' }}>
          🌷 Garden Planner — Coming Soon!
        </h2>
      )}

      <footer>Made with a little bit of magic ✨</footer>
    </div>
  )
}

export default App