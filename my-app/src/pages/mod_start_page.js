import React from "react";

import ArticleContainer from "../Components/Article_Container";
import Navbar_mod from "../Components/Navbar_moderateur";

const ModPage = () => {
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
  };

  return (

    <div className="min-h-screen w-full m-0 bg-[#06141D] text-white">
      <Navbar_mod></Navbar_mod>

      <label className='text-white'>Select Reference:</label>




      {articles.map((article) => {
        var data = cleanUpData(article);

        if (data == null) {
          return <h1 className="text-10xl">Loading</h1>;
        } else {
          return (
            <ArticleContainer
              key={article.id}
              articleData={data}
            ></ArticleContainer>
          );
        }
      })}
      
      <h1 onMouseOver={(event) => randomizeText(event.target)} className="font-bold text-white md:text-10xl relative">
        EASY QUEST
      </h1>
      <div className=" ml-72 mt-16 flex items-center">
        <iframe
          title="PDF Viewer"
          src={'./Assets/MiniProjet.pdf'}
          className="w-128 h-128 b-2 overflow-y-hidden bg-lightStartD rounded"
        />
        <div className=" ml-40 h-128 relative w-0.5  bg-blue"></div>
        <PDFViewer className="ml-40 w-128 h-128 b-2 overflow-y-hidden bg-lightStartD rounded"><PdfMetaData  {...jsonData} /></PDFViewer>
      </div>
      <div className="flex justify-center mt-8">
        <h1 id="info" className=" text-2xl"></h1>
        <CoolButton color="green" icon={faCheckCircle} text="Validate" />
        <CoolButton color="red" icon={faTrashCan} text="Delete" />
        <CoolButton color="lightStartD" icon={faPen} text="Edit" />
      </div>


      <ArticleContainer articleData={articleData} />
    </div>
  );
};
export default ModPage;
