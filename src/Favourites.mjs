import React from "react"
import App from "./App.mjs"
import HomePage from "./HomePage.mjs"
import SolidHeart from "./images/heart-solid.svg"

export default function Favourites({ favoritedRecipes, searchResults }){
    return(
        <>
            <div className="favourites-container">
                <h2 className="favourite-title">Favourite Recipes </h2>
                <img className="favourite-title-heart" src={SolidHeart} />
            </div>
            <div>
                {favoritedRecipes.length === 0 ? (
                    <p className="favourite-recipes">No favourite recipes...yet</p>
                ): (
                    <div>
                        {favoritedRecipes.map((recipeId) => {
                        const recipe = searchResults.find((r) => r.id === recipeId);
                        if (recipe) {
                            return (
                            <div key={recipe.id}>
                                <h3>{recipe.title}</h3>
                                <img src={recipe.image} alt={recipe.title} />
                            </div>
                            );
                        }
                        return null;
                        })}
                    </div>
                )} 
            </div>
        </>
    )
}