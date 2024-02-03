import '../Styles/ModNV.css'
import React from 'react'

const GenericNavBar = () => {
    return (
        <div className=" flex w-screen justify-start h-20 bg-grey text-center">
            <div className="navnav w-full md:w-3/5 flex justify-evenly items-center ml-10 text-center">
                <div className="logo-igl flex w-full items-center content-center text-center ">
                    <img className="logo-easy h-12  " src="/Assets/logo.png" alt="" />
                    <img className="logo-nom ml-2" src="/Assets/nom.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default GenericNavBar
