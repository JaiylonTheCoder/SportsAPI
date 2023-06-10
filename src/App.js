import './App.css';
import Home from './pages/Home'
import Standings from './pages/Standings';
import TopScorers from './pages/TopScorers';
import Fixtures from './pages/Fixtures'
import Lineups from './pages/Lineups';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <nav>
            <Link to='/'>
              <img src='https://www.svgrepo.com/show/81624/football.svg' alt="Football Logo" className="logo" />
            </Link>
            <Link to='/'>Home</Link>
            <Link to='standings'>standings</Link>
            <Link to='playerstats'>Top performers</Link>
            <Link to='fixtures'>Fixtures</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='standings' element={<Standings />} />
            <Route path='playerstats' element={<TopScorers />} />
            <Route path='fixtures' element={<Fixtures />} />
            <Route path="/fixture/:id/lineups" element={<Lineups />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
