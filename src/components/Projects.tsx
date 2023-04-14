import React, { useState } from 'react';
import Encadre from './Encadre';
import ProjectItem from './ProjectItem';

const Projects = () => {
  const [options, setOptions] = useState(0);
  return (
    <section className='relative flex flex-col h-[100vh] justify-center'>
      <h1 className='lg:hidden uppercase text-center text-white text-5xl absolute top-8 w-full'>
        Projects
      </h1>
      <ul
        className='absolute bottom-[1vh] text-white w-full flex flex-row flex-wrap justify-center 
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
            }}
          />
        </li>
        <li className='flex items-center mb-4 lg:mb-0 mr-4 ml-4'>
          Electronics
          <div
            className={`h-6 w-6 ${
              options === 1 ? 'bg-[#c7e4f8]' : 'bg-[#343434]'
            } rounded-full ml-8 cursor-pointer`}
            onClick={() => {
              setOptions(1);
            }}
          />
        </li>
        <li className='flex items-center mb-4 lg:mb-0 mr-4 ml-4'>
          Others
          <div
            className={`h-6 w-6 ${
              options === 2 ? 'bg-[#c7e4f8]' : 'bg-[#343434]'
            } rounded-full ml-8 cursor-pointer`}
            onClick={() => {
              setOptions(2);
            }}
          />
        </li>
      </ul>
      <div className='lg:p-[12vh] flex flex-wrap gap-8 justify-center'>
        {options === 0 && (
          <>
            <ProjectItem
              name='Krypt - (Crypto Goerli Testnet)'
              category='test'
              cover="bg-[url('/img/Web3-0.png')]"
              link='https://kryptongoerli.netlify.app/'
            />
            <ProjectItem
              name='Srika Store'
              category='test'
              cover="bg-[url('/img/ecommerce/im1.png')]"
              link='https://youtu.be/ecVZBJZusk0'
            />
            <ProjectItem
              name='Indian Coffee'
              category='test'
              cover="bg-[url('/img/Indian-Coffe.png')]"
              link='https://indiancoffee.fr/'
            />
          </>
        )}
        {options === 1 && (
          <>
            <ProjectItem
              name='Robot Suiveur'
              category='test'
              cover="bg-[url('/img/robot_suiveur/robotsuiveur.png')]"
              link=''
            />
            <ProjectItem
              name='Laser automatique pour chat'
              category='test'
              cover="bg-[url('/img/laser_chat/laserchat.png')]"
              link=''
            />
          </>
        )}
        {options === 2 && (
          <>
            <ProjectItem
              name='ListX - Base de donnée utilisateur'
              category='test'
              cover="bg-[url('/img/listx/listx.png')]"
              link=''
            />
            <ProjectItem
              name='Epitact App - React Native'
              category='test'
              cover="bg-[url('/img/Epitact.jpg')]"
              link='https://youtube.com/shorts/e7I4HjtPEDA?feature=share'
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
