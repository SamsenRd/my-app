import React from "react"
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import {  } from "react-router-dom"
import HomePage from './HomePage.mjs';
import Favourites from './Favourites.mjs';


function Navigation(){
    const location = useLocation()

    return (
      <nav>
          <Link to={location.pathname === "/favourites" ? "/" : "/favourites"}>
            {location.pathname === "/favourites" ? "Home" : "Favourites"}
          </Link>
      </nav>
    )
}

export default function App() {
  const [isFavourite, setIsFavourite] = React.useState([])
  

  return (
    <Router>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<HomePage isFavourite={isFavourite} setIsFavourite={setIsFavourite}/>} />
        <Route path="/Favourites" element={<Favourites isFavourite={isFavourite}/>} />
      </Routes>
    </Router>
    
  );
}
