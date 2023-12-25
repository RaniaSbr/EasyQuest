import React from "react";
 import Search_bar from "../Components/Search_bar.js";
 import "../Styles/Result_com.css";
 import Article from "../Components/Article.jsx";

 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faHeart } from "@fortawesome/free-solid-svg-icons";

 import { useState } from "react";
 function Result_com(params) {
   const Articles = [
     {
       titre: "Titre de l'article 1",
       date: "12/01/2023",
       text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dolore soluta in. Magnam, repellat. Sint rem sed odio. Iure, quaerat doloremque. Dolore quisquam sapiente quaerat sit animi. Quidem, provident illum.",
       favorite: 0,
     },
     {
       titre: "Titre de l'article 2",
       date: "12/01/2023",
       text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dolore soluta in. Magnam, repellat. Sint rem sed odio. Iure, quaerat doloremque. Dolore quisquam sapiente quaerat sit animi. Quidem, provident illum.",
       favorite: 1,
     },
     {
       titre: "Titre de l'article 3",
       date: "12/01/2023",
       text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dolore soluta in. Magnam, repellat. Sint rem sed odio. Iure, quaerat doloremque. Dolore quisquam sapiente quaerat sit animi. Quidem, provident illum.",
       favorite: 0,
     },
   ];

   return (
     <div className="resultcomp0">
       <Search_bar backgroundColor="white" />

       <div className="articles">
         {Articles.map((article) => (
           <Article
             key={article.date}
             titre={article.titre}
             date={article.date}
             favorite={article.favorite}
           ></Article>
         ))}
       </div>
     </div>
   );
 }
 export default Result_com;