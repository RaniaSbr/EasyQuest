import React from 'react';
import ReportForm from '../Components/Editor';
import { PDFViewer } from '@react-pdf/renderer';
import PdfReport from '../Components/pdf_report';
const YourForm = () => {
    
    const handleReportSubmit = (reportData) => {
        // Handle the submitted report data (e.g., send it to the server)
        console.log('Submitted Report:', reportData);
    };

    return (
        <div className='flex-col content-around min-h-screen justify-self-center text-center h-full bg-regal-blue'>
            <h1 className="mb-2 uppercase font-bold text-5xl text-center text-lightStartD">Report Form</h1>
            <div className='p-20 flex-auto items-stretch '>
                <ReportForm onSubmit={handleReportSubmit} className='flex-1' />
               
            </div>
            
        </div>
    );
};

export default YourForm;
