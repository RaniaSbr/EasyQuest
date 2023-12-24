import React from 'react';
import ModNV from '../Components/ModNV';
import ArticleContainer from '../Components/Article_Container';
import RandomizeText from '../Components/test';
import MultiLayerParallax from '../Components/multilayered';
import Navbar from '../Components/Navbar';



const ModPage = () => {
  const articleData = {
    date: '12/12/2023',
    title:
      'Pharmacogenetic Risk Scores for Perindopril Clinical and Cost Effectiveness in Stable Coronary Artery Disease: When Are We Ready to Do?',
    authors: ['Author 1', 'Author 2', 'Author 3', 'Author 4'],
    institutions: ['Institution 1', 'Institution 2', 'Institution 3', 'Institution 4'],
    url: 'http://ictinnovations.org/2010',
  };

  return (
    <div className="w-full h-screen  bg-[#06141D] text-white">
      <Navbar></Navbar>
      <ArticleContainer articleData={articleData} /> 
    </div>
  );
};

export default ModPage;
