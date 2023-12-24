import React from 'react';
import '../Styles/Article_Container.css';

const ArticleContainer = ({ articleData }) => {
  const { date, title, authors, institutions, url } = articleData;
  return (
    <div className="ml-40  mr-40 mt-32 p-5 rounded-lg border-2 border-LIGHT_COLOR  bg-GREY_COLOR">
      <div className='mod-article-row'>
        <time className='font-Montserrat'>{date}</time>
        <div className='mod-article-dropdown'>
          <span><img src='./Assets/td.png' alt="Icon" /></span>
          <div className='mod-article-dropdown-content'>
            <div className='mod_article_text'><a href='#'>EDIT</a></div>
            <div className='mod_article_text'><a href='#' className="text-red-500">Delete</a></div>
          </div>  
        </div>
      </div>

      <div className="mt-5 ml-5  font-Montserrat text-GREEN_COLOR font-bold text-2xl">{title}</div>

      <div className="mt-5 ml-5 font-Montserrat font-bold text-xl">
        {authors.map((author, index) => (
          <React.Fragment key={index}>
            <a href="#" className="underline decoration-sky-500 font-Montserrat²">{author}</a>
            {index < authors.length - 1 && ' | '}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-5 ml-5 font-Montserrat² font-bold text-xl">
        {institutions.map((institution, index) => (
          <div className='font-Montserrat²' key={index}>{institution}</div>
        ))}
      </div>

      <div className="mt-5 ml-5 font-Montserrat² font-bold text-xl">URL :
        <a href={url} className="mt-5 ml-5 font-Montserrat font-bold italic text-xl text-GREEN_COLOR underline decoration-WHITE_START_WITH_E_COLOR">{url}</a>
      </div>
    </div>
  );
};

export default ArticleContainer;
