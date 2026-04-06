import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RobotDetail from './pages/RobotDetail'
import KupujeRobota from './pages/KupujeRobota'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/robot/:id" element={<RobotDetail />} />
        <Route path="/kupuje-robota" element={<KupujeRobota />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
