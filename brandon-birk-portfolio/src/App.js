import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

import About from "./components/About";
import Works from "./components/Works";
import Contact from "./components/Contact";
import PostPage from "./components/PostPage";

import "./scss/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/works" exact element={<Works />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/works/:slug" element={<PostPage />} />
        </Routes>
      </main>
      <Footer title="Brandon Birk" />
    </BrowserRouter>
  );
}

export default App;
