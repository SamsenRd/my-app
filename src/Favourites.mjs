import React from "react"
import App from "./App.mjs"

export default function Favourites({isFavourite}){
    return(
        <>
            <h2>Favourite Recipes</h2>
            {isFavourite.length === 0 ? (
                <p>No favourite recipes...yet</p>
            ): (
                <div>
                    {isFavourite.map((recipe => {
                        <div key={recipe.id}>
                            {recipe.title}
                            <img src={recipe.image} alt={recipe.title} />
                        </div>
                    }))}
                </div>
            )} 
        </>
    )
}