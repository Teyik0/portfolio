'use client';

import { useState } from 'react';
import ProjectItem from './ProjectItem';
import Link from 'next/link';

const Projects = () => {
  const [options, setOptions] = useState(0);
  const bulletStyle = 'h-6 w-6 bg-[#343434] rounded-full ml-8 cursor-pointer';
  return (
    <section className='flex flex-col h-[100vh] md:h-full md:justify-center md:items-center'>
      <h1 className='md:hidden uppercase text-center text-white text-5xl pt-2'>
        Projects
      </h1>

      {/* <ul
        className='absolute bottom-[1vh] text-white w-full flex flex-row flex-wrap justify-center 
        lg:text-[3vh]'
      >
        <li className='flex items-center mb-4 lg:mb-0 mr-4 ml-4'>
          Web
          <div
            className={`${bulletStyle} ${
              options === 0 ? 'bg-[#c7e4f8]' : 'bg-[#343434]'
            } `}
            onClick={() => {
              setOptions(0);
            }}
          />
        </li>
        <li className='flex items-center mb-4 lg:mb-0 mr-4 ml-4'>
          Electronics
          <div
            className={`${bulletStyle} ${
              options === 1 ? 'bg-[#c7e4f8]' : 'bg-[#343434]'
            } `}
            onClick={() => {
              setOptions(1);
            }}
          />
        </li>
        <li className='flex items-center mb-4 lg:mb-0 mr-4 ml-4'>
          Others
          <div
            className={`${bulletStyle} ${
              options === 2 ? 'bg-[#c7e4f8]' : 'bg-[#343434]'
            }`}
            onClick={() => {
              setOptions(2);
            }}
          />
        </li>
      </ul> */}

      <div className='flex flex-wrap gap-8 justify-center py-4 overflow-auto mt-2'>
        {options === 0 && (
          <>
            <Link href='https://kryptongoerli.netlify.app/' target='_blank'>
              <ProjectItem
                name='Krypt - (Crypto Goerli Testnet)'
                category='test'
                cover="bg-[url('/img/Web3-0.png')]"
              />
            </Link>
            <Link href='https://youtu.be/ecVZBJZusk0' target='_blank'>
              <ProjectItem
                name='Srika Store'
                category='test'
                cover="bg-[url('/img/ecommerce/im1.png')]"
              />
            </Link>
            <Link href='https://indiancoffee.fr/' target='_blank'>
              <ProjectItem
                name='Indian Coffee'
                category='test'
                cover="bg-[url('/img/Indian-Coffe.png')]"
              />
            </Link>
            <Link href='https://enhanced-gpt.netlify.app/' target='_blank'>
              <ProjectItem
                name='Enhanced ChatGPT Clone'
                category='test'
                cover="bg-[url('/img/enhancedgptchat.png')]"
              />
            </Link>
          </>
        )}
        {options === 1 && (
          <>
            <ProjectItem
              name='Robot Suiveur'
              category='test'
              cover="bg-[url('/img/robot_suiveur/robotsuiveur.png')]"
            />
            <ProjectItem
              name='Laser automatique pour chat'
              category='test'
              cover="bg-[url('/img/laser_chat/laserchat.png')]"
            />
          </>
        )}
        {options === 2 && (
          <>
            <ProjectItem
              name='ListX - Base de donnée utilisateur'
              category='test'
              cover="bg-[url('/img/listx/listx.png')]"
            />
            <Link
              href='https://youtube.com/shorts/e7I4HjtPEDA?feature=share'
              target='_blank'
            >
              <ProjectItem
                name='Epitact App - React Native'
                category='test'
                cover="bg-[url('/img/Epitact.jpg')]"
              />
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
