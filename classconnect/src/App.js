import './App.css';
import Home from './pages/home';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/loginpage'
import NotFound from './pages/404';
import CreateClass from './pages/createClass';
import AdminPanel from './pages/adminPanel';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home />} />
      <Route path='/createclass' element={<CreateClass/>}/>
      <Route path='/adminpanel' element={<AdminPanel/>}/>
      <Route path="/*" element={<NotFound/>}/>  
      </Routes>
  </div>

  );
}

export default App;
