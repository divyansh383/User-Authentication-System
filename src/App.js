import logo from './logo.svg';
import './App.css';
import {Link , HashRouter, Routes, Route} from "react-router-dom";
//16
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <div className="App">
      <HashRouter>
       <AuthProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<PrivateRoute><HomePage/></PrivateRoute>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/registration" element={<RegistrationPage/>}/>
        </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;
