import React from "react";
function Contact(params) {
  return (
    <div className="w-screen grid h-[100vh]  content-end mb-10 justify-items-center gap-20">
      <div className=" grid content-center justify-items-start gap-10 w-[60vw]">
        <div className="w-full flex justify-center items-center mb-10">
          {" "}
          <img
            src="../Assets/contactus.png"
            className="w-[40vw] md:w-[20vw]"
            alt=""
          />
        </div>
        <div className="flex items-center gap-3">
          <img src="../Assets/telephone.png" className="h-[7vh]" alt="" />
          <p className="text-blue text-2xl">056789123</p>
        </div>
        <div className="flex items-center gap-3">
          <img src="../Assets/mail.png" className="h-[7vh]" alt="" />
          <p className="text-blue text-2xl">easyquest@gmail.com</p>
        </div>
      </div>
      <div className="footer-land bg-lightgrey w-screen h-14 md:h-16 flex items-center justify-center">
        <p className="text-grey text-md md:text-2xl">
          Unlocking Knowledge, One Search at a Time
        </p>
      </div>
    </div>
  );
}
export default Contact;
