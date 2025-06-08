import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
// import SmartDoor from './components/SmartDoor'
// import InformesComponent from './components/InformesComponent'
import EurovisionVotePage from './pages/EurovisionVotePage';
import EurovisionRankingPage from './pages/EurovisionRankingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<EurovisionVotePage />} />
      <Route path="/ranking" element={<EurovisionRankingPage />} />

        {/* <Route path="/propdrilling" element={<PropDrillingHomePage />} />
        <Route path="/propdrilling2" element={<PropDrillingHomePage2 />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/users" element={<UsersPage />} /> */}
             
      </Routes>

    {/* <div>
        <h2>Smartdoor</h2>
        <SmartDoor />
        <h2>Informe estado usuarios</h2>
        <InformesComponent />
    </div> */}

    </BrowserRouter>




  )
}

export default App
