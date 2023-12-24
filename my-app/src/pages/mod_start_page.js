import React from 'react';
import ModNV from '../Components/ModNV';
import ArticleContainer from '../Components/Article_Container';
import RandomizeText from '../Components/test';
import MultiLayerParallax from '../Components/multilayered';

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

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
      <ModNV></ModNV>
      <RandomizeText />

      <div className=" max-w-5xl  text-neutral-300">
      <p className='font-bold font-Montserrat justify-center text-2xl'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae
            earum nobis quasi repellat. Amet facere nulla dolorum accusantium
            sit dolores odio excepturi facilis laboriosam officiis dolorem,
            nobis reprehenderit molestiae.
          </p>
      </div>
    </div>
  );
};

export default ModPage;
