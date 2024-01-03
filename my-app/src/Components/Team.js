import React from "react";
function Team(params) {
  return (
    <div
      className="grid
    gap-[50px] content-end justify-items-center "
    >
      <img
        src="../Assets/ourteam.png"
        alt=""
        className="w-[40vw] md:w-[20vw]"
      />
      <div className="team-pictures w-[70vw]  grid grid-cols-1 md:grid-cols-3 content-center gap-10 justify-items-center">
        <div className="grid justify-center justify-items-center gap-5">
          {" "}
          <img
            src="../Assets/issam.png"
            alt=""
            className="md:h-[15vw] h-[30vw]"
          />
          <p className="font-bold text-xl">Abderrahman Mahrez</p>
        </div>
        <div className="grid justify-center justify-items-center gap-5">
          {" "}
          <img
            src="../Assets/rania.png"
            alt=""
            className="md:h-[15vw] h-[30vw]"
          />
          <p className="font-bold text-xl">Si Saber Rania</p>
        </div>
        <div className="grid justify-center justify-items-center gap-5">
          {" "}
          <img
            src="../Assets/issam.png"
            alt=""
            className="md:h-[15vw] h-[30vw]"
          />
          <p className="font-bold text-xl">Fatmi Omar</p>
        </div>
        <div className="grid justify-center justify-items-center gap-5">
          <img
            src="../Assets/yasmine.png"
            alt=""
            className="md:h-[15vw] h-[30vw]"
          />
          <p className="font-bold text-xl">Zaidi Yasmine</p>
        </div>
        <div className="grid justify-center justify-items-center gap-5">
          <img
            src="../Assets/kenza.png"
            alt=""
            className="md:h-[15vw] h-[30vw]"
          />
          <p className="font-bold text-xl">Bouaziz Kenza</p>
        </div>{" "}
        <div className="grid justify-center justify-items-center gap-5">
          <img
            src="../Assets/issam.png"
            alt=""
            className="md:h-[15vw] h-[30vw]"
          />
          <p className="font-bold text-xl">Boussebata Issam</p>
        </div>
      </div>
    </div>
  );
}
export default Team;
