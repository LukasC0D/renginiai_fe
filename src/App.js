import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import Header from './components/header/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import logo from './components/images/react-native-firebase-1.svg'
import logo1 from './components/images/laravel-2.svg'

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
       
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
    
    <div>
    <img src={logo} className="App-logo" alt="logo" />
    </div>
    <div>
    <img src={logo1} className="App-lara" alt="logo" />
    </div>
  
</>
  );
}
export default App;