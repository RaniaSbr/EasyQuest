import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfReport from './pdf_report';
import { Font } from "@react-pdf/renderer";
Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});





const ReportForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [isLocked, setIsLocked] = useState(false);

    const sendEmail = (event) => {
        event.preventDefault();
        const email_details = {
            SecureToken: '7c4fc454-7a42-4803-ae4f-f8d69bbd4b00',
            To: 'admin@email.com',
            From: "eqengine@protonmail.com",
            Subject: "This is the subject",
            Port: 2525,
            Body: "And this is the body"
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, userId, reason, date });
    };

    return (
        <div>
            <div className="flex-auto justify-self-center justify-center ">
                <form className={`items-center pb-20 pt-20  bg-lightStartE rounded ${isLocked ? 'opacity-50 pointer-events-none' : ''}`} onSubmit={handleSubmit}>
                    <div class="flex flex-col mb-4">
                        <label className="mb-2 uppercase font-bold text-5xl text-center text-dark" for="title">title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} class="border mr-20 ml-20 py-2 px-3 text-dark"></input>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 uppercase font-bold text-5xl text-dark text-center" for="mod_id">MODERATOR Id</label>
                        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} class="border mr-20 ml-20 py-2 px-3 text-dark"></input>

                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 uppercase font-bold text-5xl text-center text-dark" for="reason">Report</label>
                        <div className='mr-20 ml-20'>
                            <textarea
                                id="editor"
                                className="w-full h-40 p-2 border border-gray-300 rounded mb-4 border-dark"
                                placeholder="Write report here..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>

                        </div>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="mb-2 uppercase font-bold text-5xl text-center text-dark" for="date">Date</label>
                        <input className='text-dark mr-60 ml-60' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <button
                        onClick={() => {
                            setIsLocked(true);
                        }}
                        disabled={isLocked}
                        class="block bg-green hover:bg-regal-blue text-lightStartD uppercase text-lg mx-auto pb-3 pt-3 pr-4 pl-4 rounded" type="submit">Report</button>
                </form>
            </div>
            <PDFDownloadLink document={<PdfReport className='m-10' title={title} userId={userId} date={date} report={reason} />} fileName="fee_acceptance.pdf">
                {({ loading }) => (loading ? 'Loading document...' : isLocked ? <button>Download now!</button> : <p></p>)}
            </PDFDownloadLink>

        </div>
    );
};

export default ReportForm;
