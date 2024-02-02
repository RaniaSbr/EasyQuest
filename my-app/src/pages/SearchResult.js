import Navbar from "../Components/Navbar";
import Search_bar from "../Components/Search_bar";
import Article from "../Components/Article";
import Filter from "../Components/Filter";
import KeyWords from "../Components/Filter";
import Authors from "../Components/Filter";
import Institutions from "../Components/Filter";
import React, { useEffect, useState } from "react";
import query from "../Components/Search_bar"
function SearchResult(params) {
  
var API ='http://127.0.0.1:8000/api/search-articles/?q=';

if (KeyWords & !Authors & !Institutions) {
  API ='http://127.0.0.1:8000/api/search-articles-keywords/?q=';
} else{

  if (!KeyWords & Authors & !Institutions) {
    API ='http://127.0.0.1:8000/api/search-articles-autors/?q=';
  } else {

    if (!KeyWords & !Authors & Institutions) {
      API ='http://127.0.0.1:8000/api/search-articles-institution/?q=';
    }else{
      API ='http://127.0.0.1:8000/api/search-articles/?q=';
    }
  }
  
}

  var searchQuery = query;
  const [Articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const tokenValue = getCookie('token');

   fetch(API + searchQuery)
    .then(response => response.json())
    .then(data => {


    var articlesCount = data.articles_count;
    var results = data.results;
    var message = data.message;


      if (articlesCount === 0) {
          document.getElementById('message').innerText = message;
      } else {
        var articles = results.map((results,index) => ({
          date: "12/12/2023",
          title: results.content.tilte,
          authors: results.content.autors.map((author) => author.name),
          institutions: results.content.institution.map((author) => author.name),
          url: "http://ictinnovations.org/2010",
          fav: "0",
        }));
        setArticles(articles);
        setLoading(false);
      }

      if (data.favorites.length > 0) {
        var articles = data.favorites.map((favorite,index) => ({
          date: "12/12/2023",
          title: favorite.content.tilte,
          authors: favorite.content.autors.map((author) => author.name),
          institutions: favorite.content.institution.map((author) => author.name),
          url: "http://ictinnovations.org/2010",
          fav: "0",
        }));
        setArticles(articles);
        setLoading(false);


      } else {
      
        
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des articles:', error);
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












  const articleData = {
    date: "12/12/2023",
    title:
      "Pharmacogenetic Risk Scores for Perindopril Clinical and Cost Effectiveness in Stable Coronary Artery Disease: When Are We Ready to Do?",
    authors: ["Author 1", "Author 2", "Author 3", "Author 4"],

    institutions: [
      "BIG UNIVERSITY OF SOMETHING SOMETHING VERY BIG",
      "Institution 2",
      "Institution 3",
      "Institution 4",
    ],

    url: "http://ictinnovations.org/2010",
    fav: "1",
  };

  return (
    <div className="SeearchResult_Page grid content-center gap-10 justify-items-center ">
      <Navbar></Navbar>
      <div className="w-[90vw] flex items-center justify-start ">
        {" "}
        <Search_bar backgroundColor="white"></Search_bar>
      </div>
      <div className="w-[90vw] flex items-center justify-start ">
        <Filter></Filter>
      </div>

      {Articles.map((article,index)=>(
        <Article key={index} articleData={article}/>
      ))}
      
    </div>
  );
}
export default SearchResult;
