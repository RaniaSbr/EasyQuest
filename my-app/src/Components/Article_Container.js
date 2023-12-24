import React from 'react'
import '../Styles/Article_Container.css'
import Hyphenated from 'react-hyphen';

const ArticleContainer = ({ articleData }) => {
  const { date, title, authors, institutions, url } = articleData
  return (
    <Hyphenated>
    <div className='overflow-wrap break-word mx-4 md:mx-8 lg:mx-16 xl:mx-24 mt-32 p-5 rounded-lg border-2 border-lightStartD bg-grey'>
      <div className='mod-article-row'>
        <time className='font-Montserrat'>{date}</time>
        <div className='mod-article-dropdown'>
          <span>
            <img src='./Assets/td.png' alt='Icon' />
          </span>
          <div className='mod-article-dropdown-content'>
            <div className='mod_article_text'>
              <a href='#'>EDIT</a>
            </div>
            <div className='mod_article_text'>
              <a href='#' className='text-red-500'>
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
        <p className=' hyphens-auto mt-5 ml-5 font-Montserrat text-green font-bold text-2xl '>
          {title}
        </p>
      <div className='mt-5 ml-5 font-Montserrat font-bold text-xl'>
        {/* Authors */}
        {authors.map((author, index) => (
          <React.Fragment key={index}>
            <a
              href='#'
              className='underline decoration-sky-500 font-Montserrat'
            >
              {author}
            </a>
            {index < authors.length - 1 && ' | '}
          </React.Fragment>
        ))}
      </div>

      <div className='mt-5 ml-5 font-Montserrat font-bold text-xl'>
        {/* Institutions */}
        {institutions.map((institution, index) => (
          <div className='font-Montserrat' key={index}>
            {institution} |
          </div>
        ))}
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

export default ArticleContainer
