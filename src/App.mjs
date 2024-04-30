import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import SearchLimitExceededPage from "./SearchLimitExceededPage.mjs";
import HomePage from './HomePage.mjs';
import Favourites from './Favourites.mjs';


function Navigation(){
    const location = useLocation()

    return (
      <nav>
        <div className="link-styles">
          <Link to="/" className={`link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
          <Link to="/favourites" className={`link ${location.pathname === "/favourites" ? "active" : ""}`}>Favourites</Link>
        </div>
      </nav>
    )
}

export default function App() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])
  const [favoritedRecipes, setFavoritedRecipes] = React.useState([])
  const [searchCount, setSearchCount] = React.useState(0)

  useEffect(()=>{
    const storedFavorites = localStorage.getItem('favoritedRecipes')
    if(storedFavorites) {
      setFavoritedRecipes(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() =>{
    localStorage.setItem('favoritedRecipes', JSON.stringify(favoritedRecipes))
  }, [favoritedRecipes])
  

  const toggleFavorite  = (recipeId) => {
    if (favoritedRecipes.includes(recipeId)){
      setFavoritedRecipes(favoritedRecipes.filter(id => id !== recipeId))
    }else{
      setFavoritedRecipes([...favoritedRecipes, recipeId])
    }
  }

  const handleSearch= () => {
    if(searchCount >= 150){
      return <Navigate to="/SearchLimitExceededPage" />
    }
    setSearchCount(prevSearchCount => prevSearchCount + 1)
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
          favoritedRecipes={favoritedRecipes} setFavoritedRecipes={setFavoritedRecipes} toggleFavorite={toggleFavorite} onSearch={handleSearch}/>} 
        />
        <Route path="/Favourites" element={<Favourites favoritedRecipes={favoritedRecipes} setFavoritedRecipes={setFavoritedRecipes} 
          searchResults={searchResults} setSearchResults={setSearchResults} toggleFavorite={toggleFavorite}/>} 
          />
        <Route path="/SearchLimitExceededPage" element={<SearchLimitExceededPage />}
        />
      </Routes>
    </Router>
    
  );
}
