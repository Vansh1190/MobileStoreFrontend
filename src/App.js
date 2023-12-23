import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HockeyTeamList from './Pages/HomePage';
import HomePage from './Pages/HomePage';
import Navbar from './Components/Navbar';
import TrackOrder from './Pages/TrackOrder';
import MobileDetails from './Pages/MobileDetails';
import BuyNow from './Pages/BuyNow';

function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage/>} />
          {/* About Page */}
          <Route path="/about" element={<TrackOrder/>} />
          <Route path="/mobile/:id" element={<MobileDetails/>} />
          <Route path="/buy/:id" element={<BuyNow/>} />
          <Route path="/trackOrder" element={<TrackOrder/>} />
          <Route path="/orderPlaced/:id" element={<BuyNow/>} />
        </Routes>
    </Router>
  );
}

export default App;
