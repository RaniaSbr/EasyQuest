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

  return (

    <div className="min-h-screen w-full m-0 bg-[#06141D] text-white">
      <Navbar_mod></Navbar_mod>
      
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

    </div>
  );
};
export default ModPage;
