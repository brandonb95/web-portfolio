import { BrowserRouter, Route, Routes} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Works from './components/Works';
import Contact from './components/Contact';
import PostPage from './components/PostPage';
import AOS from 'aos';

import './scss/styles.scss';

function App() {
  
  return (
    <BrowserRouter >

    <header id="masthead" className="site-header">
    <Routes>
    <Route path='/' exact element={<Home />}/>
    <Route path='/about' exact element={<About />}/>
    <Route path='/works' exact element={<Works />}/>
    <Route path="/contact" element={<Contact />} />
    <Route path="/works/:slug" element={<PostPage />} />

  </Routes>
        </header>
        </BrowserRouter>

  );
}

export default App;
