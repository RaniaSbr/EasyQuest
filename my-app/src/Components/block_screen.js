import React from 'react';

const BlockScreen = ({ isVisible, bodyText }) => {
    if (!isVisible) return null;
    return (
        <div className='fixed inset-0 bg-dark bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-[500px]'>
                <div className='bg-darkgrey p-10 rounded z-0 text-center border-lightStartE '>
                    <div className='text-red font-bold text-2xl justify-center'> WARNING !</div>
                    <div className='font-bold text-xl justify-center'>{bodyText}</div>
                </div>
            </div>
        </div>
    );
};

export default BlockScreen;
