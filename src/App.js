import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import Header from './components/header/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Events from './components/event/Events';
import Event from './components/event/Event';
import EventDetails from './components/event/EventDetails';

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="container py-3">
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events/>} />
            <Route path="/event/create" element={<Event/>} />
            <Route path="/event/:id" element={<EventDetails/>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
</>
  );
}
export default App;