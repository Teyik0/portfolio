'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

interface IProps {
  name: string;
  category: string;
  cover: string;
}

const ProjectItem = ({ name, category, cover }: IProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`h-[20vh] w-[40vh] lg:h-[30vh] lg:w-[60vh] 
        rounded-3xl cursor-pointer flex justify-center items-center
        ${cover} bg-cover bg-center bg-no-repeat
        ease-in-out duration-500 overflow-hidden relative z-0 hover:scale-110

        before:bg-[#75A1A1] before:opacity-70 before:absolute before:h-full before:w-full 
        before:translate-x-[100%] before:rounded-l-full before:transition-all 
        before:duration-700 before:ease-in-out hover:before:translate-x-0 hover:before:rounded-none

        hover:after:content-['Try_this_out'] after:duration-1000 after:ease-in-out after:translate-x-[100%]
        hover:after:translate-x-0 hover:after:z-40 hover:after:absolute hover:after:uppercase
        after:font-bold after:tracking-wider
        `}
      onMouseOverCapture={() => setHover(true)}
      onMouseOutCapture={() => setHover(false)}
    >
      {hover && (
        <img
          src='/img/ajouter.png'
          alt='en savoir plus'
          className='h-[100px] w-[100px] md:h-[10vh] md:w-[10vh] p-4'
        />
      )}
      <h2
        className='absolute bottom-0 right-0 p-2 bg-gray-800 rounded-l-full text-white uppercase tracking-widest
        lg:text-[1.5vh] sm:text-[10px] text-[8px]'
      >
        {name}
      </h2>
    </div>
  );
};

export default ProjectItem;
