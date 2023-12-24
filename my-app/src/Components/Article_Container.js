import React from 'react';
import '../Styles/Article_Container.css';

const ArticleContainer = ({ articleData }) => {
  const { date, title, authors, institutions, url } = articleData;
  return (
    <div className="ml-80 mt-32 p-5 rounded-lg border-2 border-sky-500 w-4/6 h-4/6 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-zinc-800 via-gray-800 to-slate-900">
      <div className='mod-article-row'>
        <time className='font-GODOFWAR'>{date}</time>
        <div className='mod-article-dropdown'>
          <span><img src='./Assets/td.png' alt="Icon" /></span>
          <div className='mod-article-dropdown-content'>
            <div className='mod_article_text'><a href='#'>EDIT</a></div>
            <div className='mod_article_text'><a href='#' className="text-red-500">Delete</a></div>
          </div>  
        </div>
      </div>

      <div className="mt-5 ml-5 font-GODOFWAR text-sky-400 font-bold text-2xl">{title}</div>

      <div className="mt-5 ml-5 font-GODOFWAR font-bold text-xl">
        {/* Authors */}
        {authors.map((author, index) => (
          <React.Fragment key={index}>
            <a href="#" className="underline decoration-sky-500 font-GODOFWAR">{author}</a>
            {index < authors.length - 1 && ' | '}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-5 ml-5 font-GODOFWAR font-bold text-xl">
        {/* Institutions */}
        {institutions.map((institution, index) => (
          <div className='font-GODOFWAR' key={index}>{institution}</div>
        ))}
      </div>

      <div className="mt-5 ml-5 font-GODOFWAR font-bold text-xl">URL :
        <a href={url} className="mt-5 ml-5 font-Montserrat font-bold italic text-xl text-cyan-400 underline decoration-lime-500">{url}</a>
      </div>
    </div>
  );
};

export default ArticleContainer;
