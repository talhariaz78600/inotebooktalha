// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Notestate from './context/notes/Notestate';
import Log from './components/Log';
// import Alert from './components/Alert';
import Footer from './components/Footer';
import Sign from './components/Sign';
import User from './components/User';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
   
    <>
    <Notestate>

      <Router>
        <Navbar/>
        {/* <Alert/> */}
        <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/signin" element={<Sign/>}></Route>
        <Route exact path="/login" element={<Log/>}></Route>
        <Route exact path="/usershow" element={<User/>}></Route>
        
      </Routes>
      </Router>
      <Footer mode={"light"}/>
        
    </Notestate>

    </>
  
    );
}

export default App;
