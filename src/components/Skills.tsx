'use client';

import Image from 'next/image';
import { allLogos } from '../context/utils';

const Skills = () => {
  return (
    <section className='flex flex-col h-[100vh] md:h-full justify-center items-center'>
      <h1 className='md:hidden uppercase text-center text-white text-5xl pt-2'>
        Skills
      </h1>

      <div
        className='flex flex-wrap gap-4 sm:gap-5 md:gap-[3vh] justify-center
        md:w-full sm:w-[550px] w-full m-auto overflow-auto py-2'
      >
        {allLogos.map((logo: any) => (
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
                  fill={true}
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
