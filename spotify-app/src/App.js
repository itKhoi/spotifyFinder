import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import HomePage from './modules/HomePage';
import RequireAuth from './modules/RequireAuth';
import Profile from './modules/Profile';
import Playlist from './modules/Playlist';
import TrackPage from './modules/TrackPage';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>}/>
          <Route path="/playlist/" element={<RequireAuth><Playlist/></RequireAuth>}/>
          <Route path="/playlist/:id" element={<TrackPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
