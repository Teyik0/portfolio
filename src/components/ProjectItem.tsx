"use client";

import Link from "next/link";
import { useState } from "react";
import { BsGithub, BsYoutube } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";

interface IProps {
  name: string;
  category: string[];
  cover: string;
  url?: {
    project?: string;
    youtube?: string;
    github?: string;
  };
}

const ProjectItem = ({ name, category, cover, url }: IProps) => {
  const [hover, setHover] = useState(false);
  const categoryStyle = `text-white py-2 px-4 bg-[#4c436e] rounded-full lg:text-[1.5vh] sm:text-[10px] text-[8px]`;
  const urlStyle = `hover:text-[#775e28] duration-300 ease-in-out`;
  return (
    <div
      className={`h-[20vh] w-[40vh] lg:h-[30vh] lg:w-[60vh] 
        rounded-3xl flex justify-center items-center
        ${cover} bg-cover bg-center bg-no-repeat
        ease-in-out duration-500 overflow-hidden relative z-0 hover:scale-105

        before:bg-[#75A1A1] before:opacity-70 before:absolute before:h-full before:w-full 
        before:translate-x-[100%] before:rounded-l-full before:transition-all 
        before:duration-500 before:ease-in-out hover:before:translate-x-0 hover:before:rounded-none

        hover:after:content-['Check_this_out'] after:duration-500 after:ease-in-out after:translate-x-[100%]
        hover:after:translate-x-0 hover:after:z-40 hover:after:absolute hover:after:uppercase
        after:font-bold after:tracking-wider
        `}
      onMouseOverCapture={() => setHover(true)}
      onMouseOutCapture={() => setHover(false)}
    >
      {hover && (
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          {category.map((item, index) => (
            <span key={index} className={categoryStyle}>
              {item}
            </span>
          ))}
        </div>
      )}
      {hover && (
        <div className="absolute bottom-4 left-4 flex gap-4 flex-wrap items-center">
          {url?.github && (
            <Link href={url.github} target="_blank">
              <BsGithub
                key={url.github}
                className={`${urlStyle} lg:text-[3.2vh] sm:text-[25px] text-[15px]`}
              />
            </Link>
          )}
          {url?.youtube && (
            <Link href={url.youtube} target="_blank">
              <BsYoutube
                key={url.youtube}
                className={`${urlStyle} lg:text-[4vh] sm:text-[30px] text-[20px]`}
              />
            </Link>
          )}
          {url?.project && (
            <Link href={url.project} target="_blank">
              <TbWorldWww
                key={url.project}
                className={`${urlStyle} lg:text-[4vh] sm:text-[30px] text-[20px]`}
              />
            </Link>
          )}
        </div>
      )}
      <h2
        className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-l-full text-white uppercase tracking-widest
        lg:text-[1.5vh] sm:text-[10px] text-[8px] cursor-pointer hover:text-[#775e28] duration-300 ease-in-out"
      >
        {url?.project ? (
          <Link href={url.project} target="_blank">
            {name}
          </Link>
        ) : (
          name
        )}
      </h2>
    </div>
  );
};

export default ProjectItem;
