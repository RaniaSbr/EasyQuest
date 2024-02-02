import React from 'react';
import { faCancel, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CoolButton from "../Components/cool_button";

const Modal = ({ isVisible, onMoveOn, onCancel, bodyText, moveOnText, cancelText, moveOnIcon, moveOnColor }) => {
    if (!isVisible) return null;
    return (
        <div className='fixed inset-0 bg-dark bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-[500px]'>
                <div className='bg-darkgrey p-10 rounded z-10 text-center border-lightStartE '>
                    <div className='text-red font-bold text-2xl justify-center'> WARNING !</div>
                    <div className='font-bold text-xl justify-center'>{bodyText}</div>
                    <div className="flex justify-center mt-8">
                        <CoolButton color={moveOnColor} icon={moveOnIcon} text={moveOnText} func={onMoveOn} />
                        <CoolButton color="green" icon={faCancel} text={cancelText} func={onCancel} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

