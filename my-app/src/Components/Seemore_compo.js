import React from "react";
import Hyphenated from "react-hyphen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";

const Seemore_compo = ({ articleData }) => {
  const { date, title, authors, institutions, url } = articleData;

  return (
    <Hyphenated>
      <div className="p-10 grid gap-6">
        <time className="font-Montserrat">{date}</time>
        <div className="seemore-row flex justify-between items-start">
          <p className=" hyphens-auto   w-[50%] font-Montserrat text-green font-bold text-2xl ">
            {title}
          </p>
          <div className="seemore-right md:flex grid gap-5">
            <button className="flex gap-2 border-2 border-blue  rounded-xl px-6 py-2 justify-center items-center">
              <img src="./Assets/empty-heart.png" className="h-6" alt="" />
              <p className="text-md text-blue">Add to favorite</p>
            </button>
            <button className="flex gap-2 border-2 border-blue  rounded-xl px-6 py-2 justify-center items-center">
              {" "}
              <img src="./Assets/download.png" className="h-6" alt="" />
              <p className="text-md text-blue">Download PDF</p>
            </button>
          </div>
        </div>
        <div>
          {" "}
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex debitis
            modi quae laboriosam sapiente optio animi accusantium aspernatur
            quasi hic nisi consequuntur nesciunt temporibus, ipsum fugiat
            tempora quaerat? Magni, nihil! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Alias accusantium sunt labore vel sed
            omnis facere, facilis suscipit, atque obcaecati numquam aut neque
            nobis harum ipsa voluptatem? Hic, distinctio molestias!'' Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
            maiores quibusdam, eum consequuntur velit aut hic explicabo ipsum
            magni laudantium enim nulla molestias voluptates asperiores? Id sit
            atque magni obcaecati? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Possimus totam ab ducimus. Eveniet quisquam, culpa
            vero quas maxime, nobis velit itaque beatae dolore explicabo tenetur
            ipsum officia, amet dignissimos provident! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Accusamus cumque, quas tempora
            nobis natus minus, ab nemo officia beatae necessitatibus dolorum.
            Cupiditate ipsa odit odio similique nostrum! Dolores, mollitia
            cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maxime temporibus dolores porro id magnam voluptas facilis, possimus
            assumenda eaque ipsa delectus soluta quod reiciendis rerum ut amet,
            obcaecati minima? Harum.
          </p>
        </div>
        <div className=" flex items-start justify-between ">
          <div className=" font-Montserrat font-bold text-xl ">
            {/* Authors */}
            {authors.map((author, index) => (
              <React.Fragment key={index}>
                <a
                  href="#"
                  className="underline decoration-sky-500 font-Montserrat"
                >
                  {author}
                </a>

                {index < authors.length - 1 && " | "}
              </React.Fragment>
            ))}
          </div>
          <div className="font-Montserrat font-bold text-xl">
            {/* Institutions */}
            {institutions.map((institution, index) => (
              <div
                className="font-Montserrat underline decoration-green"
                key={index}
              >
                {institution}
              </div>
            ))}
          </div>
        </div>
        <div className="hyphens-auto mt-5 ml-5 font-Montserrat font-bold text-xl">
          URL :
          <a
            href={url}
            className="mt-5 ml-5 font-Montserrat font-bold italic text-xl text-green underline decoration-lightStartD"
          >
            {url}
          </a>
        </div>
      </div>
    </Hyphenated>
  );
};
export default Seemore_compo;
