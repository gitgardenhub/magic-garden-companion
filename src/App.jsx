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

        <nav>
          <a href="#" onClick={() => setCurrentPage('home')}>Home</a>
          <a href="#" onClick={() => setCurrentPage('database')}>Crop Database</a>
          <a href="#" onClick={() => setCurrentPage('calculator')}>Value Calculator</a>
          <a href="#" onClick={() => setCurrentPage('planner')}>Garden Planner</a>
        </nav>
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

            <button
              className="primary-button"
              onClick={() => setCurrentPage('database')}
            >
              Explore Your Garden ✨
            </button>
          </section>

          <section className="features">
            <h2>Your Garden Toolkit</h2>

            <p className="section-subtitle">
              Everything you need to make your garden flourish.
            </p>

            <div className="feature-grid">
              <div
                className="feature-card"
                onClick={() => setCurrentPage('database')}
              >
                <span>🌱</span>
                <h3>Crop Database</h3>
                <p>Explore crops, prices, harvests, and growing details.</p>
              </div>

              <div className="feature-card">
                <span>💰</span>
                <h3>Value Calculator</h3>
                <p>Calculate crop values with sizes and mutations.</p>
              </div>

              <div className="feature-card">
                <span>🌷</span>
                <h3>Garden Planner</h3>
                <p>Plan your layout and organize your favorite crops.</p>
              </div>

              <div className="feature-card">
                <span>🐝</span>
                <h3>Pet Companions</h3>
                <p>Discover pet bonuses and their garden benefits.</p>
              </div>
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