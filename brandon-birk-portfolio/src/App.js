import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Works from './components/Works';

import './scss/styles.scss';

function App() {
  return (
    <header id="masthead" className="site-header">
         
        <Home />
      
        <About />
        <Works />
        </header>
  );
}

export default App;
