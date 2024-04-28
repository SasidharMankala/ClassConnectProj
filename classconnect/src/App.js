import './App.css';
import Home from './pages/home';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/loginpage'
import NotFound from './pages/404';
import CreateClass from './pages/createClass';
import AdminPanel from './pages/adminPanel';
import Register from './pages/register';
import JoinClass from './pages/joinClass';
import ProfilePage from './pages/profilePage';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home />} />
      <Route path='/createclass' element={<CreateClass/>}/>
      <Route path='/adminpanel' element={<AdminPanel/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/joinclass' element={<JoinClass/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path="/*" element={<NotFound/>}/>  
      </Routes>
  </div>

  );
}

export default App;
