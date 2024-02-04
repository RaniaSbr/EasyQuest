
import React, { useState } from 'react'
import '../Styles/Article_Container.css'
import Hyphenated from 'react-hyphen';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis ,faCircle,faHeart} from "@fortawesome/free-solid-svg-icons";
import { BsCloudDownload } from "react-icons/bs";

const Article = ({ articleData }) => {
  const { date, title, authors, institutions, url,fav} = articleData;
  const [dropdownVisible,setDropdownVisible]=useState();
  //favorite est un booleen qui prend la veulr false:si article non ajoute aux favorites et true:si article ajoute aux favorites
const [favorite, setFavorite] = useState(articleData.fav);


  const dropdownOff=(event)=>{
setDropdownVisible(false);
  }

   const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); 
  };
  const toggleFavorite=()=>{
        articleData.fav = !favorite ? '1' : '0';

    setFavorite(!favorite);
     console.log("Liked:", favorite);
  }
  return (
    <Hyphenated>
    <div className='overflow-wrap break-word mx-4 md:mx-8 lg:mx-16 xl:mx-24  p-5 rounded-lg border-2 border-lightStartD bg-grey'>
      <div className='mod-article-row'>
        <div className="article-row-left flex gap-5 items-center ">
          <time className='font-Montserrat'>{date}</time>
                      <NavLink to='/See_more' >

          <div className="see-more flex  items-center gap-2 ">
            <FontAwesomeIcon icon={faCircle} />
            
             <p className='hover:text-blue hover:underline cursor-pointer'>See more</p>
            </div>
                         </NavLink>


          </div>
        <div className='mod-article-dropdown gap-5 flex items-center'>
          <button><BsCloudDownload size='25px'/></button>

        {favorite ? (
                        <img src="./Assets/white-heart.png" className='h-6 cursor-pointer' alt="" onClick={toggleFavorite} />

            ) : (
              <img src="./Assets/heart.png" className='h-6 cursor-pointer' alt="" onClick={toggleFavorite} />
            )}

           <button onClick={toggleDropdown} className='cursor-pointer'>
          <FontAwesomeIcon icon={faEllipsis} size='2xl'  />
          </button>
         {dropdownVisible && ( 
          <div className='mod-article-dropdown-content '>
            <div className='mod_article_text'>
              <a href='#'>Download</a>
            </div>
            <div className='mod_article_text'>
              <a href='#' className='text-red-500'>
                See more
              </a>
            </div>
          </div>)}
        </div>
      </div>
        <p className=' hyphens-auto mt-5 ml-5 font-Montserrat text-green font-bold text-2xl '>
          {title}
        </p>
      <div className='mt-5 ml-5 font-Montserrat font-bold text-xl'>
        {/* Authors */}
        {Array.isArray(authors) ? ( authors.map((author, index) => (
        <React.Fragment key={index}>
        <a
          href='#'
          className='underline decoration-sky-500 font-Montserrat'>
          {author.name}
        </a>
        {index < authors.length - 1 && ' | '}
      </React.Fragment>
    ))
  ) : (
    <a
      href='#'
      className='underline decoration-sky-500 font-Montserrat'
    >
      {authors.name}
    </a>
  )}
      </div>


      <div className='mt-5 ml-5 font-Montserrat font-bold text-xl'>
        {/* Institutions */}
        {Array.isArray(institutions) ? ( institutions.map((institution, index) => (
          <div className='font-Montserrat underline decoration-green' key={index}>
            {institution.name}
          </div>
        ))
  ) : (
    <div className='font-Montserrat underline decoration-green'>
      {institutions.name}
    </div>
      )}
      </div>

      <div className='hyphens-auto mt-5 ml-5 font-Montserrat font-bold text-xl'>
        URL :
        <a
          href={url}
          className='mt-5 ml-5 font-Montserrat font-bold italic text-xl text-green underline decoration-lightStartD'
        >
          {url}
        </a>
      </div>
    </div>
    </Hyphenated>
  )
}

export default Article;

