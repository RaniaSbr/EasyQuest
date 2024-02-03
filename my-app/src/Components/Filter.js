import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoFilterOutline } from "react-icons/io5";
import "../Styles/Article.css";
import SearchResult from "../pages/SearchResult";

function Filter() {
  const [date, setDate] = useState(new Date());
  const [filterVisible, setFilterVisible] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [authors, setAuthors] = useState("");
  const [institutions, setInstitutions] = useState("");
 
  const handleSearch = async() => {
    var ai = document.getElementById('query_r').value;
    SearchResult(ai, keywords, authors, institutions);
  };

  
  const toggleFiltervisible = (event) => {
    setFilterVisible(!filterVisible);
  };
  const onChange = (selectedDate) => {
    setDate(selectedDate);
    setShowCalendar(false);
  };

  const onChange2 = (selectedDate) => {
    setDate(selectedDate);
    setShowCalendar2(false);
  };
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const toggleCalendar2 = () => {
    setShowCalendar2(!showCalendar2);
  };
  return (
    <div className="filter-compo  ">
      <div className="filter-compo-button mb-4">
        <button
          onClick={toggleFiltervisible}
          className="bg-grey flex gap-5 px-8 py-1 items-center border-lightgrey border-2 rounded-3xl"
        >
          <IoFilterOutline size="25px" />
          <p className="text-xl">Filter</p>
        </button>
      </div>
      {filterVisible && (
        <div className="filter-compo-after grid grid-cols-1 gap-10 pb-20 border-2 mb-20 p-8 bg-lightgrey w-[60vw] rounded-xl border-blue absolute">
          <div className="flex justify-start items-end gap-8">
            <label htmlFor="keywords" className="text-grey w-[100px]">
              Key words
            </label>
            <input
              type="text"
              id="keywords"
              className="border-b border-grey bg-transparent w-4/5 focus:outline-none text-grey"
            />
          </div>

          <div className="flex justify-start items-end gap-8">
            <label htmlFor="authors" className="w-[100px] text-grey">
              Authors
            </label>
            <input
              type="text"
              id="authors"
              className="border-b border-grey bg-transparent w-4/5 focus:outline-none text-grey"
            />
          </div>

          <div className="flex justify-start items-end gap-8">
            <label htmlFor="institutions" className="text-grey w-[100px]">
              Institutions
            </label>
            <input
              type="text"
              id="institutions"
              className="border-b border-grey bg-transparent w-4/5 focus:outline-none text-grey"
            />
          </div>

          <div className="flex justify-start items-end gap-8">
            <label htmlFor="periode" className="text-grey w-[100px]">
              Periode
            </label>
            <div className="filter-period1 grid ">
              <input
                type="text"
                value={date.toDateString()}
                readOnly
                onClick={toggleCalendar}
                className="border-b  cursor-pointer  border-grey bg-transparent w-4/5 focus:outline-none text-grey"
              />
              {showCalendar && (
                <div className="mt-2">
                  <Calendar
                    onChange={onChange}
                    value={date}
                    className="text-grey absolute custom-calendar"
                  />
                </div>
              )}
            </div>
            <div className="filter-period1 grid">
              <input
                type="text"
                value={date.toDateString()}
                readOnly
                onClick={toggleCalendar2}
                className="cursor-pointer  border-b border-grey bg-transparent w-4/5 focus:outline-none text-grey"
              />
              {showCalendar2 && (
                <div className="mt-2">
                  <Calendar
                    onChange={onChange2}
                    value={date}
                    className=" custom-calendar text-grey absolute"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="search-filter flex items-center justify-center mt-10">
            <button onClick= { handleSearch }
            className="bg-blue w-[80%] md:w-[50%] lg:w-[30%]  py-2 rounded-2xl">
              {" "}
              <p className="text-xl">Search</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;