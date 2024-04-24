import React from 'react'
import recipeIconImg from "./images/recipe-icon.jpeg"

export default function HomePage(){
    const [searchQuery, setSearchQuery] = React.useState('')
    const [searchResults, setSearchResults] = React.useState([])

    const handleSubmit = async(event) => {
        event.preventDefault()
        try{
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=c28b8fdf4c28497c8a79d15f3f67381d&query=${searchQuery}`)
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            console.log(data)
            setSearchResults(data.results)
        } catch(error){
            console.error('Error fetching recipes:', error)
        }
    }

    return(
        <>
            <div className='homepage-container'>
                <img src={recipeIconImg} className="recipe-logo" alt="Image of the recipe logo."/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="search" className="recipe-label">Search ingredient(s) or cuisine type:</label><br/><br/>
                    <input 
                        type='text' 
                        id="search" 
                        name="search" 
                        className='recipe-searchBar'
                        value={searchQuery}   
                        onChange={(event) => setSearchQuery(event.target.value) } 
                    />
                    <input type="submit" value="Submit" className='recipe-submit'/>
                </form>
            </div>

            <div className='search-results'>
                <h2>Search Results:</h2>
                <ul>
                    {searchResults.map(recipe => {
                        return(
                            <li key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt={recipe.title} />
                        </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
