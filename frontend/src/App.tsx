import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Components/Customer/Home';
import Auth from './Components/Customer/Auth';
import UserDetails from './Components/Customer/UserDetails';
import AdminHome from './Components/Admin/AdminHome';
import AdminAuth from './Components/Admin/AdminAuth';

const App = () => {
  return (
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Login" element={<Auth />} />
    <Route path="/UserInfo" element={<UserDetails />} />
    <Route path="/AdminHome" element={<AdminHome />} />
    <Route path="/AdminLogin" element={<AdminAuth />} />
  </Routes>
</Router>
    )
}

export default App