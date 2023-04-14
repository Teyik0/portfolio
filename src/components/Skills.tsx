'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { devLogos, elecLogos, othersLogos, webLogos } from '../context/utils';

const Skills = () => {
  const [options, setOptions] = useState(0);
  const [selected, setSelected] = useState(webLogos);
  return (
    <section className='flex flex-col h-[100vh] md:h-full justify-center items-center'>
      <h1 className='md:hidden uppercase text-center text-white text-5xl absolute top-8 w-full'>
        Skills
      </h1>

      <ul
        className='absolute bottom-[3vh] text-white w-full flex flex-row flex-wrap justify-center 
      lg:text-[3vh]'
      >
        <li className='flex items-center mb-4 lg:mb-0 mr-4 ml-4'>
          Web
          <div
            className={`h-6 w-6 ${
              options === 0 ? 'bg-[#c7e4f8]' : 'bg-[#343434]'
            } rounded-full ml-8 cursor-pointer`}
            onClick={() => {
              setOptions(0);
              setSelected(webLogos);
            }}
          />
        </li>
        <li className='flex items-center mb-4 lg:mb-0 mr-4 ml-4'>
          Development
          <div
            className={`h-6 w-6 ${
              options === 1 ? 'bg-[#c7e4f8]' : 'bg-[#343434]'
            } rounded-full ml-8 cursor-pointer`}
            onClick={() => {
              setOptions(1);
              setSelected(devLogos);
            }}
          />
        </li>
        <li className='flex items-center mb-4 lg:mb-0 mr-4 ml-4'>
          Electronics
          <div
            className={`h-6 w-6 ${
              options === 2 ? 'bg-[#c7e4f8]' : 'bg-[#343434]'
            } rounded-full ml-8 cursor-pointer`}
            onClick={() => {
              setOptions(2);
              setSelected(elecLogos);
            }}
          />
        </li>
        <li className='flex items-center mb-4 lg:mb-0 mr-4 ml-4'>
          Others
          <div
            className={`h-6 w-6 ${
              options === 3 ? 'bg-[#c7e4f8]' : 'bg-[#343434]'
            } rounded-full ml-8 cursor-pointer`}
            onClick={() => {
              setOptions(3);
              setSelected(othersLogos);
            }}
          />
        </li>
      </ul>

      <div
        className='flex flex-wrap gap-4 sm:gap-5 md:gap-[3vh] justify-center
        md:w-full sm:w-[550px] w-full m-auto'
      >
        {selected.map((logo: any) => (
          <div key={logo.name}>
            <div
              className='bg-[#343434] rounded-full flex justify-center items-center
                xl:w-[16vh] xl:h-[16vh] md:w-[12vh] md:h-[12vh] 
                w-[70px] h-[70px]'
            >
              <div
                className='relative xl:w-[8vh] xl:h-[8vh] md:w-[6vh] md:h-[6vh] 
                  w-[45px] h-[45px]'
              >
                <Image
                  alt={logo.name}
                  src={logo.imgPath}
                  layout='fill'
                  className='object-contain w-full relative h-auto'
                />
              </div>
            </div>
            <p className='text-white text-[11px] md:text-base lg:text-[2vh] md:text-[1.5vh] text-center mt-2 xl:w-[16vh] md:w-[12vh] w-[70px]'>
              {logo.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
