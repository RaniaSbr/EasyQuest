import React, { useEffect, useState } from 'react';
import ArticleAPI from '../api/article_api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UnPublishedArticlePDFViewer = ({ pdfId }) => {
    const notify = () => toast.error();
    const [pdfData, setPdfData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () =>{
            try {
                const data = await ArticleAPI.fetchPdfData(pdfId);
                setPdfData(data);
                setLoading(false);
            } catch (error) {
                notify();
                toast.error("ERROR HAPPENED  : " + error);
                
                
            }
        }
        getData();
    }, [pdfId]);

    

    if (loading) {
        return <ToastContainer position="bottom-center" autoClose={false} theme='dark'/>;
    }
    console.log("URL : ", pdfData);
    return (

        <div className=" w-128 h-128 b-2 overflow-y-hidden bg-lightStartD rounded">
            <iframe
                src={pdfData}
                width='100%'
                height="100%"
            ></iframe>
        </div>

    );
};

export default UnPublishedArticlePDFViewer;
