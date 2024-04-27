import React from "react"
import HomePage from './HomePage.mjs';
import Favourites from './Favourites.mjs';

export default function App() {
  const [isFavourite, setIsFavourite] = React.useState([])

  return (
    <div>
      <HomePage isFavourite={isFavourite} setIsFavourite={setIsFavourite}/>
      <Favourites isFavourite={isFavourite}/>
    </div>
  );
}
