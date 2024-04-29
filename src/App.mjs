import React from "react"
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from './HomePage.mjs';
import Favourites from './Favourites.mjs';


function Navigation(){
    const location = useLocation()

    return (
      <nav>
        <Link to="/" className={`link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
        <Link to="/favourites" className={`link ${location.pathname === "/favourites" ? "active" : ""}`}>Favourites</Link>
      </nav>
    )
}

export default function App() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])
  const [favoritedRecipes, setFavoritedRecipes] = React.useState([])

  const toggleFavorite  = (recipeId) => {
    if (favoritedRecipes.includes(recipeId)){
      setFavoritedRecipes(favoritedRecipes.filter(id => id !== recipeId))
    }else{
      setFavoritedRecipes([...favoritedRecipes, recipeId])
    }
  }
  

  return (
    <Router>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<HomePage 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          searchResults={searchResults} setSearchResults={setSearchResults}
          favoritedRecipes={favoritedRecipes} setFavoritedRecipes={setFavoritedRecipes} toggleFavorite={toggleFavorite}/>
        } 
        />
        <Route path="/Favourites" element={<Favourites favoritedRecipes={favoritedRecipes} searchResults={searchResults}/>} />
      </Routes>
    </Router>
    
  );
}
