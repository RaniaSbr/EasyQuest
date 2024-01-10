import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArticleContainer from "../Components/Article_Container";
import Navbar_mod from "../Components/Navbar_moderateur";

const ModPage = () => {

  const notify = () => toast.error();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ArticleAPI.fetchArticles();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        notify();
        toast.error("ERROR HAPPENED  : " + error);
      }
    };

    getData();
  }, []);
 


  if (loading) {
    return <ToastContainer position="bottom-center" autoClose={false} theme="dark" />;
  }
  if (articles == undefined) {
    return (
      <div className="min-h-screen w-full m-0 bg-[#06141D] text-white text-center">
        <Navbar_mod></Navbar_mod>
        
        <div className=" text-lightgrey text-2xl">CONNECTION TO SERVER FAILED</div>
      </div>
    );
  }
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

>>>>>>> MAHRAZABDELRAHMEN
    </div>
  );
};
export default ModPage;
