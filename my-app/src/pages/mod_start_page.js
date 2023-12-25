import React from 'react';

import ArticleContainer from '../Components/Article_Container';
import Navbar_mod from '../Components/Navbar_moderateur';


const ModPage = () => {
  const articleData = {
    date: '12/12/2023',
    title:
      'Pharmacogenetic Risk Scores for Perindopril Clinical and Cost Effectiveness in Stable Coronary Artery Disease: When Are We Ready to Do?',
    authors: ['Author 1', 'Author 2', 'Author 3', 'Author 4'],

    institutions: ['BIG UNIVERSITY OF SOMETHING SOMETHING VERY BIG', 'Institution 2', 'Institution 3', 'Institution 4'],

    url: 'http://ictinnovations.org/2010',
  };

  return (

    <div className="min-h-screen w-full m-0 bg-[#06141D] text-white">
    <Navbar_mod></Navbar_mod>
      <ArticleContainer articleData={articleData} />

    </div>
  );
};

export default ModPage;
