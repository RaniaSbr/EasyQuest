import React, { useState, useEffect } from "react";
import Navbar_mod from "../Components/Navbar_moderateur";
import { PDFViewer } from "@react-pdf/renderer";
import PdfMetaData from "../Components/pdf_meta_data";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faCheckCircle,
  faPen,
  faTrashCan,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import CoolButton from "../Components/cool_button";
import UnPublishedArticlePDFViewer from "../Components/pdf_viewer";
import Modal from "../Components/Modal";
import ArticleAPI from "../api/article_api";
import { useNavigate } from "react-router-dom";
import BlockScreen from "../Components/block_screen";

const ModEditPage = () => {
  const navigator = useNavigate();
  const notify = () => toast.error();
  const [jsonData, setJsonData] = useState(null);
  const [rawJsonData, setRawJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blockscreen, setBlockScreen] = useState(false);
  const articleId = useParams();
  const [showDeleteModal, setShowModal] = useState(false);
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [showEditateModal, setShowEditModal] = useState(false);
  const numericArticleId = parseInt(articleId["articleId"], 10) 

  useEffect(() => {
    const getData = async () => {
      try {

        const data = await ArticleAPI.fetchArticle(numericArticleId, true);
        const rawData = await ArticleAPI.fetchArticle(numericArticleId, false);
        setRawJsonData(rawData);
        setJsonData(data);
        setLoading(false);

      } catch (error) {
        notify();
        toast.error("ERROR HAPPENED  : " + error);
      }
    };

    getData();
  }, [articleId]);
  const changeVisibility = () => {
    setShowModal(!showDeleteModal);
  };
  const changeValidateVisibility = () => {
    setShowValidateModal(!showValidateModal);
  };
  const changeEditVisibility = () => {
    console.log("THE KEY IS : ", numericArticleId);
    setShowEditModal(!showEditateModal);
  };
  if (loading) {

    return <ToastContainer position="bottom-center" autoClose={false} theme="dark" />;
  }
  return (
    <div className="min-h-screen w-full m-0 bg-[#06141D] text-white">
      <Navbar_mod></Navbar_mod>
      <BlockScreen bodyText={"Please Wait"} isVisible={blockscreen}></BlockScreen>
      <ToastContainer position="bottom-center" autoClose={false} theme="dark" />
      <div className=" ml-72 mt-16 flex items-center">

        <Modal
          onMoveOn={async () => {
            try {
              setBlockScreen(true);
              changeVisibility();
              await ArticleAPI.deleteArticle(numericArticleId);
              navigator('/ModPage/');
              setBlockScreen(false);
              changeVisibility();

            } catch (error) {
              console.error("Error during MoveOn:", error);
              notify();
              toast.error("ERROR HAPPENED  : " + error);
            }
          }}

          moveOnColor="red"
          moveOnIcon={faTrashCan}
          onCancel={changeVisibility}
          cancelText={"Cancel"}
          moveOnText={"Continue!"}
          bodyText={
            ">Pressing On Continue Will Remove The Article From The DataBase; Are You Sure To Continue ?"
          }
          isVisible={showDeleteModal}
        ></Modal>
        <Modal
          onMoveOn={
            async () => {
              try {
                setBlockScreen(true);
                changeValidateVisibility();
                await ArticleAPI.validateArticle(numericArticleId);
                notify();
                toast.success("SUCCESS: Published Article");
                navigator('/ModPage/');
                setBlockScreen(false);
                changeValidateVisibility();

              } catch (error) {
                console.error("Error during MoveOn:", error);
                notify();
                toast.error("ERROR HAPPENED  : " + error);
              }
            }
          }
          moveOnColor="lightStartE"
          moveOnIcon={faCheck}
          onCancel={changeValidateVisibility}
          cancelText={"Cancel"}
          moveOnText={"Continue!"}
          bodyText={
            ">Pressing On Continue Will Publish the article; Are You Sure To Continue ?"
          }
          isVisible={showValidateModal}
        ></Modal>
        <UnPublishedArticlePDFViewer
          className=" w-128 h-128 b-2 overflow-y-hidden bg-lightStartD rounded"
          pdfId={numericArticleId}
        ></UnPublishedArticlePDFViewer>
        <div className=" ml-40 h-128 relative w-0.5 invisible  bg-blue"></div>
        <PDFViewer className="ml-40 w-128 h-128 b-2 overflow-y-hidden bg-lightStartD rounded">
          <PdfMetaData meta_data={jsonData} />
        </PDFViewer>
      </div>

      <div className="flex justify-center mt-8">
        <CoolButton
          func={changeValidateVisibility}
          color="green"
          icon={faCheckCircle}
          text="Validate"
        />
        <CoolButton
          func={changeVisibility}
          key={numericArticleId}
          color={"red"}
          icon={faTrashCan}
          text="Delete"
        />
        <CoolButton color="lightStartD" icon={faPen} func={() => {navigator(`/edit-article-form/${numericArticleId}`)}} text="Edit" />
      </div>
    </div>
  );
};
export default ModEditPage;
