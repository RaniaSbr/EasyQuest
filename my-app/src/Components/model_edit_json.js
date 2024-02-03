import React, { useState, useEffect } from 'react';
import ArticleAPI from '../api/article_api';
import BlockScreen from './block_screen';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const INSTITUTIONS_DATA = ["department", "name", "post_code", "settlement", "country"]
const REFERENCE_DATA = ["raw_text", "reference_id"]
const OTHER = ["title", "keywords", "doi"]
const ModalEditJSON = ({ }) => {
    const [editedData, setEditedData] = useState(null);
    const navigator = useNavigate();
    const [selectedReferenceIndex, setSelectedReferenceIndex] = useState(0);
    const [selectedAuthorsIndex, setSelectedAuthorIndex] = useState(0);
    const [selectedCollegesIndex, setSelectedCollegesIndex] = useState(0);

    const [block, setBlock] = useState(false);
    const [loading, setLoading] = useState(true);
    const id_key = useParams();
    const articleID = parseInt(id_key["articleId"], 10)



    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const data = await ArticleAPI.fetchArticle(articleID);
                setEditedData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching article data:', error);
            }
        };

        fetchArticleData();
    }, [articleID]);

    const changeBlockVis = () => {
        setBlock(!block);
    }

    const handleReferenceChange = (field, value) => {
        const updatedReferences = [...editedData.meta_data.references];
        updatedReferences[selectedReferenceIndex] = {
            ...updatedReferences[selectedReferenceIndex],
            [field]: value
        };
        setEditedData(prevData => ({
            ...prevData,
            references: updatedReferences

        }));
    };

    const handleCollegesChange = (field, value) => {

        const updatedColleges = [...editedData.meta_data.institutions];
        updatedColleges[selectedCollegesIndex] = {
            ...updatedColleges[selectedCollegesIndex],
            [field]: value
        };
        
        editedData.meta_data.institutions = updatedColleges;
    };

    const handleAuthorChange = (value) => {
        const updatedAuthors = [...editedData.meta_data.authors];
        updatedAuthors[selectedAuthorsIndex].name = value;
        setEditedData(prevData => ({
            ...prevData,
            authors: updatedAuthors
        }));
    };


    const handleInputChange = (field, value) => {
        
        setEditedData(prevData => ({
            ...prevData,
            meta_data: {
                ...prevData.meta_data,
                [field]: value,
            },
        }));
        if ( field == "keywords"){ 
            
            editedData.meta_data.keywords = value;
            console.log("THIS IS : ", editedData.meta_data.keywords);
        }
    };

    const handleReferenceSelect = (index) => {
        setSelectedReferenceIndex(index);
    };

    const handleCollegeSelect = (index) => {
        setSelectedCollegesIndex(index);
    };



    const handleAuthorSelect = (index) => {
        setSelectedAuthorIndex(index);
    };





    if (loading) return null;









    return (

        <div className=" bg-lightStartD rounded-lg shadow-xl m-20 p-8 text-center divide-y divide-dashed">
            <h2 className="text-5xl font-bold text-red mb-6">Article Meta Data Edit</h2>
            <BlockScreen></BlockScreen>
            {OTHER.map((data) => (

                <div className='flex-col'>
                    <p className='text-white font-bold text-xl text-green'>{data.toLocaleUpperCase()}</p>
                    <input
                        type='text'
                        defaultValue={editedData.meta_data[data]}
                        onChange={(e) => handleInputChange(data, e.target.value)} 
                        className='input-field border-dark border-2 border-solid m-2 w-full text-dark'
                    />
                    <hr class="my-12 h-0.5 border-t-0 bg-regal-blue opacity-100 dark:opacity-50" />
                </div>
            ))}


            <div className='flex-col'>
                <p className='text-white font-bold text-2xl mt-10  text-red'>Authors</p>
                <hr class="my-5 mb-16 h-0.5 border-t-0 bg-regal-blue opacity-100 dark:opacity-50" />
                <select

                    onChange={(e) => handleAuthorSelect(Number(e.target.value))}
                    className=" text-dark border-dark border-2 border-solid block w-full p-2 mb-6 text-sm text-gray-900  border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    {editedData.meta_data.authors.map((author, index) => (
                        <option articleID={index} defaultValue={index}>Author {index}</option>
                    ))}
                </select>
            </div>
            <div className='flex-col '>
                <p className='text-white font-bold text-xl justify-center m-2 text-green' >Name</p>
                <input
                    type='text' defaultValue={editedData.meta_data.authors[selectedAuthorsIndex].name}
                    onChange={(e) => handleAuthorChange(e.target.value)} className='input-field border-solid border-2 border-dark w-full text-dark' />
            </div>

            <hr class="my-12 mt-16 h-0.5 border-t-0 bg-regal-blue opacity-100 dark:opacity-50" />
            <div className='flex-col'>
                <p className='text-white font-bold text-2xl text-red m-2'>Institutions</p>
                <hr class="my-5 mb-16 h-0.5 border-t-0 bg-regal-blue opacity-100 dark:opacity-50" />
                <select
                    value={selectedReferenceIndex}
                    onChange={(e) => handleCollegeSelect(Number(e.target.value))}
                    className="block text-dark w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    {editedData.meta_data.institutions.map((college, index) => (
                        <option articleID={index} defaultValue={index}>{index}</option>
                    ))}

                </select>
                {INSTITUTIONS_DATA.map((data) => (
                    <div className='flex-col'>
                        <p className='text-white font-bold text-xl justify-center m-2 text-green' >{data.toUpperCase()}</p>
                        <input
                            type='text'
                            onChange={(e) => handleCollegesChange(data, e.target.value)}
                            className='border-solid border-2 border-dark input-field w-full text-dark' />
                    </div>
                ))}
            </div>


            <hr class="my-12 mt-16 h-0.5 border-t-0 bg-regal-blue opacity-100 dark:opacity-50" />






            <div className='flex-col'>
                <p className='text-white font-bold text-2xl text-red m-2'>References</p>
                <hr class="my-5 mb-16 h-0.5 border-t-0 bg-regal-blue opacity-100 dark:opacity-50" />
                <select
                    value={selectedReferenceIndex}
                    onChange={(e) => handleReferenceSelect(Number(e.target.value))}
                    className="block text-dark w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    {editedData.meta_data.references.map((reference, index) => (
                        <option articleID={index} defaultValue={index}>{index}</option>
                    ))}
                </select>

                {REFERENCE_DATA.map((data) => (
                    <div className='flex-col m-5'>
                        <p className='text-white font-bold text-xl justify-center m-2 text-green' >{data.toUpperCase()}</p>
                        <input
                            type='text'
                            onChange={(e) => handleReferenceChange(data, e.target.value)}
                            className='border-solid border-2 border-dark input-field w-full text-dark' />
                    </div>
                ))}
                <hr class="my-5 mb-16 h-0.5 border-t-0 bg-regal-blue opacity-100 dark:opacity-50" />



            </div>





            <div className='m-10'>
                <button className='text-red hover:text-green border border-red hover:border-green px-7 focus:ring-4 focus:outline-none'
                    onClick={async () => {
                        try {
                            changeBlockVis();
                            await ArticleAPI.updateArticle(articleID, editedData);
                            navigator('/ModPage/');
                            changeBlockVis();
                        } catch (error) {

                        }

                    }} >Submit</button>

            </div>
        </div>


    );
};

export default ModalEditJSON;
