import React from "react"
import { Link } from "react-router-dom"

export default function SearchLimitExceededPage(){
    return(
        <div>
            <h2>The Chefs are done cooking for today, please come back tomorrow!</h2>
            <Link to="/">Go back to home page.</Link>
        </div>
    )
}