import React from 'react'
import recipeIconImg from "./images/logo-icon.svg"
import heartIcon from "./images/heart-solid.svg"
import heartOutline from "./images/heart-outline.svg"

export default function HomePage({searchQuery, setSearchQuery, searchResults, setSearchResults, favoritedRecipes, setFavoritedRecipes,toggleFavorite, onSearch}){
    const [errorText, setErrorText] = React.useState('')

    const handleSubmit = async(event) => {
        event.preventDefault()
        onSearch()
        try{
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=c28b8fdf4c28497c8a79d15f3f67381d&query=${searchQuery}`)
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            if(searchQuery === ''){
                setSearchResults([])
                setErrorText('')
            }else{
                setSearchResults(prevSearchResults => {
                    if(!data.results.map(recipe => recipe.title === searchQuery)){
                        setErrorText("Item doesn't exist...try another item.")
                    }else{
                        setErrorText('')
                    }
                    return data.results
                })
            }
            setSearchQuery('')
        } catch(error){
            console.error('Error fetching recipes:', error)
        }
    }

    const handleFavourite = (recipeId) => {
        toggleFavorite(recipeId)
    }

    const reset  = () => {
        setSearchQuery('')
        setSearchResults([])
        setErrorText('')
        setFavoritedRecipes([])
    }


    return(
        <>
            <div className='homepage-container'>
                <img src={recipeIconImg} className="recipe-logo" alt="Recipe logo."/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="search" className="recipe-label">Search ingredient(s) or cuisines for inspiration!</label><br/><br/>
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
                {errorText !== '' && <p className='error-message'>{errorText}</p>}
            </div>

            <hr className='horizontal-line'/>

            <div className='search-results'>
                {searchResults.length === 0 ? (
                    <h2 className='search-results-title'>No recipes...yet</h2>
                ) : (
                    <h2 className='search-results-title2'>Search results:</h2>
                )}
                <div className='recipe-container'> 
                    {searchResults.map(recipe => {
                        return (
                            <>
                                <div key={recipe.id}>
                                    <div className='title-heart-container'>
                                        <h3 className='recipe-title'>{recipe.title}</h3>
                                        <button className="heart-icon-button-container" onClick={() => {handleFavourite(recipe.id)}}>
                                            <img className="heart-icon" src={favoritedRecipes.includes(recipe.id) ? heartIcon : heartOutline} alt='heart icon' />
                                        </button>
                                    </div>
                                    <img src={recipe.image} alt={recipe.title} className='recipe-img'/>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div>
                {searchResults.length !== 0 ? (
                    <button onClick={reset} className='reset-btn'>Reset</button>
                ) : null}
            </div>
        </>
    )
}


