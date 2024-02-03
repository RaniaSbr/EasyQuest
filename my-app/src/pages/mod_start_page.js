import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
async function checkUserType() {
  const tokenValue = getCookie('token');

  if (!tokenValue) {
    console.error('Token not found.');
    return;
  }

  const apiUrl = 'http://127.0.0.1:8000/api/check';
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${tokenValue}`,
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    const data = await response.json();
    const { value } = data;
    if (value == 1 ) {
      console.log('Received value:', value);
    }
    return value;
    

    
  } else {
    console.log('Error:', response.status);
  }
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

async function checkUserType() {
  const tokenValue = getCookie('token');

  if (!tokenValue) {
    console.error('Token not found.');
    return;
  }

  const apiUrl = 'http://127.0.0.1:8000/api/check';
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${tokenValue}`,
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    const data = await response.json();
    const { value } = data;
    if ( value == 1 ){
      console.log("ejfedvgfvkdvsdkvkhgdvhhkgdvhdhgvd");
      return;
    }

    console.log('Received value:', value);
  } else {
    console.log('Error:', response.status);
  }
}


const ModPage = () => {

  const notify = () => toast.error();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setforbidden] = useState(false);
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
    
    const value = checkUserType();
    console.log(value );
    if(value == 1){
      setforbidden(true) ;
      console.log('hajdaaaaaaa');
      console.log(forbidden);
      console.log('hajdaaaaaaa');
      return;
    }
    getData();
  }, []);


  if(forbidden){
     NavLink.push('/User');
     return <div></div>
  }
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
    <div className="min-h-screen w-full m-0  text-white">
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
    </div>
  );
};

export default ModPage;