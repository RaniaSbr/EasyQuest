<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArticleContainer from "../Components/Article_Container";
import Navbar_mod from "../Components/Navbar_moderateur";
import ArticleAPI from "../api/article_api";

const cleanUpData = (originalData) => {
  const cleanedData = {
    title: originalData.meta_data.title,
    authors: originalData.meta_data.authors.map((author) => author.name),
    institutions: originalData.meta_data.institutions.map(
      (institution) => institution.name
    ),
    date: originalData.meta_data.pub_date,
    url: "go.com",
    id: originalData.id,
  };

  return cleanedData;
};


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
=======
import React, { useState, useRef } from "react";
import Navbar_mod from "../Components/Navbar_moderateur";
import { PDFViewer } from '@react-pdf/renderer';
import PdfMetaData from '../Components/pdf_meta_data'
import { faCheckCircle, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CoolButton from "../Components/cool_button";
import useRandomizeText from "../Components/test";
const ModPage = () => {
  const { randomizeText } = useRandomizeText('EASY QUEST');
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

  const jsonData = {
    title: "Calculation of prompt diphoton production cross sections at Tevatron and   LHC energies",
    references: [" Bologna, C. (2018) What happens to your mind and body when you feel homesick? Available at: https://www.huffingtonpost.com/entry/what-happens-mindbody-homesick_us_5b201ebde4b09d7a3d77eee1 (Accessed: 24 June 2021)", "\n Bologna, C. (2018) What happens to your mind and body when you feel homesick? Available at: https://www.huffingtonpost.com/entry/what-happens-mindbody-homesick_us_5b201ebde4b09d7a3d77eee1 (Accessed: 24 June 2021)"],
    "abstract": "  A fully differential calculation in perturbative quantum chromodynamics is presented for the production of massive photon pairs at hadron colliders. All next-to-leading order perturbative contributions from quark-antiquark, gluon-(anti)quark, and gluon-gluon subprocesses are included, as well as all-orders resummation of initial-state gluon radiation valid at next-to-next-to-leading logarithmic accuracy. The region of phase space is specified in which the calculation is most reliable. Good agreement is demonstrated with data from the Fermilab Tevatron, and predictions are made for more detailed tests with CDF and DO data. Predictions are shown for distributions of diphoton pairs produced at the energy of the Large Hadron Collider (LHC). Distributions of the diphoton pairs from the decay of a Higgs boson are contrasted with those produced from QCD processes at the LHC, showing that enhanced sensitivity to the signal can be obtained with judicious selection of events. ",
    "authors": [
      "Chetanya Puri",
      "G. Swapna",
      "GORAN NENADIC"
    ],
    "keywords": [
      "css",
      "blockchain in food industry",
      "php",
      "blockchain in disaster recovery"
    ],
    institutions: ["Universidad Politecnica de Puerto Rico", "University of St Thomas"],
    url: "https://example.com",
  };

>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
  return (

    <div className="min-h-screen w-full m-0 bg-[#06141D] text-white">
      <Navbar_mod></Navbar_mod>
<<<<<<< HEAD
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
=======
      
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

>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)
    </div>
  );
};
export default ModPage;
