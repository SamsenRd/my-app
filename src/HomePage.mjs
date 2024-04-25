import React from 'react'
import recipeIconImg from "./images/logo-icon.svg"

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
            setSearchResults(data.results)
            setSearchQuery('')
        } catch(error){
            console.error('Error fetching recipes:', error)
        }
    }

    return(
        <>
            <div className='homepage-container'>
                <img src={recipeIconImg} className="recipe-logo" alt="Image of the recipe logo."/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="search" className="recipe-label">Search ingredient(s) or cuisine for inspiration!</label><br/><br/>
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
            <hr className='horizontal-line'/>

            <div className='search-results'>
                <h2 className='search-results-title'>Search Results:</h2>
                <div className='recipe-container'> 
                    {searchResults.map(recipe => {
                        return (
                            <>
                                <div key={recipe.id}>
                                    <h3 className='recipe-title'>{recipe.title}</h3>
                                    <img src={recipe.image} alt={recipe.title} className='recipe-img'/>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
