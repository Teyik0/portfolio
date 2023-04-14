/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface IProps {
  name: string;
  category: string;
  cover: string;
  link: string;
}

const ProjectItem = ({ name, category, cover, link }: IProps) => {
  const [hover, setHover] = useState(false);
  return (
    <Link href={link} target='_blank'>
      <div
        id='project-section'
        className={`h-[20vh] w-[40vh] lg:h-[20vh] lg:w-[40vh] 
      rounded-3xl cursor-pointer flex justify-center items-center
    ${cover} bg-cover bg-center bg-no-repeat
    ease-in-out duration-500 overflow-hidden relative z-0 hover:scale-110

    before:bg-[#75A1A1] before:opacity-70 before:absolute before:h-full before:w-full 
    before:translate-x-[100%] before:rounded-l-full before:transition-all 
    before:duration-700 before:ease-in-out hover:before:translate-x-0 hover:before:rounded-none

    hover:after:content-['En_savoir_plus'] after:duration-1000 after:ease-in-out after:translate-x-[100%]
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
    </Link>
  );
};

export default ProjectItem;
