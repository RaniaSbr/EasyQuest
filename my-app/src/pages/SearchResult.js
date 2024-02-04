import Navbar from "../Components/Navbar";
import Filter from "../Components/Filter";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleContainer from "../Components/Article_Container";
import SearchField from "../Components/SearchField";

const cleanUpData = (originalData) => {
  console.log("data jey : ", originalData.meta_data.keyword);
  const cleanedData = {
    title: originalData.meta_data.title,
    keywords: originalData.meta_data.keywords,
    references: originalData.meta_data.references.map((ref) => ref.raw_text),
    abstract: originalData.meta_data.abstract,
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



function SearchResult(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('')
  var API;

  const updateQuery = async (newQuery) => {
    

    const keyWords = newQuery.keywords
    const author = newQuery.authos_names
    const institutions = newQuery.institutions_names
    console.log(keyWords, author, institutions)
    
    API =
      `http://127.0.0.1:8000/article/search-articles/?authors=${author}&title=${query}&institutions=${institutions}&keywords=${keyWords}`
    try {
      const response = await axios.get(
        API
      );
      const array = response.data["results"].map((element) => cleanUpData(element))

      setData(array);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data != null) {
      setLoading(false);
    }
  }, [data, loading]);
  const search_article = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/article/search-articles/?authors=${query}&title=${query}&institutions=${query}&keywords=${query}`
      );
      const array = response.data["results"].map((element) => cleanUpData(element))

      setData(array);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    
  };

  return (
    <div className="SeearchResult_Page grid content-center gap-10 justify-items-center ">
      <Navbar></Navbar>
      <div className="w-[90vw] flex items-center justify-start ">
        <SearchField
          placeholder={'Search'}
          value={query}
          onChange={handleSearchChange}
        />
        <button onClick={async () => { await search_article() }}>Search</button>
      </div>
      <div className="w-[90vw] flex items-center justify-start ">
        <Filter setQuery={updateQuery}></Filter>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data &&
        data.map((article) => (
          <ArticleContainer
            key={article.id}
            articleData={article}
          ></ArticleContainer>
        ))
      )}
    </div>
  );
}

export default SearchResult;