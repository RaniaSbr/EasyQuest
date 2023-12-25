import React, { useState } from "react";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faHeart } from "@fortawesome/free-solid-svg-icons";
 import "../Styles/Article.css";

 const Article = ({ titre, date, favorite }) => {
   const [isFavorite, setIsFavorite] = useState(favorite === 1);

   const handleToggleFavorite = () => {
     setIsFavorite(!isFavorite);
   };

   return (
     <div className="article">
       <h1>{`Titre: ${titre} Date: ${date}`}</h1>
       <button
         className={`favorite-icon ${isFavorite ? "favorite" : ""}`}
         onClick={handleToggleFavorite}
       >
 <FontAwesomeIcon icon={faHeart} />      </button>
     </div>
   );
 };

 export default Article;