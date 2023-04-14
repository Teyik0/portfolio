import Link from 'next/link';
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { RiMenu4Fill } from 'react-icons/ri';
import React, { useState } from 'react';

const Encadre = ({ page, setPage }: any) => {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className='absolute hidden lg:flex lg:flex-col top-[1rem] lg:top-[16vh] left-8 lg:left-[4vh] pt-[4vh] z-40'>
        <Link
          href='https://www.facebook.com/theo.samarasinghe/'
          target='_blank'
        >
          <BsFacebook
            className='text-white w-[2rem] h-[2rem] lg:h-[4vh] lg:w-[4vh] mr-[1rem] lg:mb-[2rem]
          hover:text-[#775e28]'
          />
        </Link>
        <Link href='https://www.instagram.com/theo.sama/' target='_blank'>
          <BsInstagram
            className='text-white w-[2rem] h-[2rem] lg:h-[4vh] lg:w-[4vh] mr-[1rem] lg:mb-[2rem]
          hover:text-[#775e28]'
          />
        </Link>
        <Link
          href='https://www.linkedin.com/in/th%C3%A9o-samarasinghe/'
          target='_blank'
        >
          <BsLinkedin
            className='text-white w-[2rem] h-[2rem] lg:h-[4vh] lg:w-[4vh]
          hover:text-[#775e28]'
          />
        </Link>
      </div>
      <div
        className='w-full h-[1px] bg-white absolute top-[12vh] opacity-20
        hidden lg:flex'
      />
      <div
        className='w-full h-[1px] bg-white absolute bottom-[12vh] opacity-20
        hidden lg:flex'
      />
      <div
        className='w-[1px] h-[100vh] bg-white absolute left-[12vh] opacity-20
        hidden lg:flex'
      />
      <div
        className='w-[1px] h-[100vh] bg-white absolute right-[12vh] opacity-20
        hidden lg:flex'
      />
      <div
        className='text-white text-3xl lg:text-[3vh] lg:flex lg:flex-row lg:absolute lg:top-[6vh] lg:right-[24vh] 
      w-[600px] justify-evenly hidden z-40'
      >
        <h3
          className={`hover:text-[#775e28] duration-500 cursor-pointer mr-4 
           ${page === 0 && 'text-[#775e28]'}`}
          onClick={() => {
            setPage(0);
            setMenu(false);
          }}
        >
          Home
        </h3>
        <h3
          className={`hover:text-[#775e28] duration-500 cursor-pointer mr-4
          ${page === 1 && 'text-[#775e28]'}`}
          onClick={() => {
            setPage(1);
            setMenu(false);
          }}
        >
          Skills
        </h3>
        <h3
          className={`hover:text-[#775e28] duration-500 cursor-pointer mr-4
          ${page === 2 && 'text-[#775e28]'}`}
          onClick={() => {
            setPage(2);
            setMenu(false);
          }}
        >
          Portfolio
        </h3>
        <h3
          className={`hover:text-[#775e28] duration-500 cursor-pointer 
          ${page === 3 && 'text-[#775e28]'}`}
          onClick={() => {
            setPage(3);
            setMenu(false);
          }}
        >
          Contact
        </h3>
      </div>

      <div
        className={`fixed lg:hidden p-4 ${
          menu && 'bg-[#2f363d]'
        } z-40 rounded-br-2xl`}
      >
        <RiMenu4Fill
          className='text-white text-4xl cursor-pointer'
          onClick={() => setMenu((prev) => !prev)}
        />
        {menu && (
          <div className='text-white text-xl w-full justify-evenly z-40 mt-4'>
            <h3
              className={`hover:text-[#775e28] duration-500 cursor-pointer
           ${page === 0 && 'text-[#775e28] pl-6 pt-2 pb-2'}`}
              onClick={() => {
                setPage(0);
                setMenu(false);
              }}
            >
              Home
            </h3>
            <h3
              className={`hover:text-[#775e28] duration-500 cursor-pointer 
          ${page === 1 && 'text-[#775e28] pl-6 pt-2 pb-2'}`}
              onClick={() => {
                setPage(1);
                setMenu(false);
              }}
            >
              Skills
            </h3>
            <h3
              className={`hover:text-[#775e28] duration-500 cursor-pointer 
          ${page === 2 && 'text-[#775e28] pl-6 pt-2 pb-2'}`}
              onClick={() => {
                setPage(2);
                setMenu(false);
              }}
            >
              Portfolio
            </h3>
            <h3
              className={`hover:text-[#775e28] duration-500 cursor-pointer 
          ${page === 3 && 'text-[#775e28] pl-6 pt-2 pb-2'}`}
              onClick={() => {
                setPage(3);
                setMenu(false);
              }}
            >
              Experiences
            </h3>
            <h3
              className={`hover:text-[#775e28] duration-500 cursor-pointer 
          ${page === 4 && 'text-[#775e28] pl-6 pt-2 pb-2'}`}
              onClick={() => {
                setPage(4);
                setMenu(false);
              }}
            >
              Contact
            </h3>
            <div className='flex mt-4'>
              <Link
                href='https://www.facebook.com/theo.samarasinghe/'
                target='_blank'
              >
                <BsFacebook
                  className='text-white w-[2rem] h-[2rem] lg:h-[4vh] lg:w-[4vh] mr-[1rem] lg:mb-[2rem]
          hover:text-[#775e28]'
                />
              </Link>
              <Link href='https://www.instagram.com/theo.sama/' target='_blank'>
                <BsInstagram
                  className='text-white w-[2rem] h-[2rem] lg:h-[4vh] lg:w-[4vh] mr-[1rem] lg:mb-[2rem]
          hover:text-[#775e28]'
                />
              </Link>
              <Link
                href='https://www.linkedin.com/in/th%C3%A9o-samarasinghe/'
                target='_blank'
              >
                <BsLinkedin
                  className='text-white w-[2rem] h-[2rem] lg:h-[4vh] lg:w-[4vh]
          hover:text-[#775e28]'
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Encadre;
