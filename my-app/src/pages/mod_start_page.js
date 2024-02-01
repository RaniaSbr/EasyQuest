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
    return <ToastContainer position="bottom-center" autoClose={false} theme="dark"/>;
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
    </div>
  );
};

export default ModPage;
