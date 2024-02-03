import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Article from "../Components/Article";

function Favorites() {
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const tokenValue = getCookie('token');
    
    fetch('http://127.0.0.1:8000/api/favorite-list/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + tokenValue 
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des favoris');
      }

      return response.json();
    })
    .then(data => {
      console.log("data ",data.favorites)
      if (data.favorites.length > 0) {
        var articles = data.favorites.map((favorite,index) => ({
          date: "12/12/2023",
          title: favorite.content.tilte,
          authors: favorite.content.autors.map((author) => author.name),
          institutions: favorite.content.institution.map((author) => author.name),
          url: "http://ictinnovations.org/2010",
          fav: "0",
        }));
        setFavoriteArticles(articles);
        setLoading(false);


      } else {
      
        
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des favoris:', error);
    });
  }, []);

  function getCookie(name) {
    const cookieName = name + '=';
    const cookieArray = document.cookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  } 
  console.log(favoriteArticles);
  if (loading || favoriteArticles.length == 0) {
    return null;
  }
  return (
    <div className="SearchResult_Page grid content-center gap-10 justify-items-center">
      <Navbar />
      {favoriteArticles.map((article, index) => (
        <Article key={index} articleData={article} />
      ))}
    </div>
  );
}

export default Favorites;