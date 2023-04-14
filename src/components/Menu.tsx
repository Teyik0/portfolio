'use client';

import Link from 'next/link';
import { useGlobalContext } from '@/context/store';
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';

const Menu = () => {
  const { page, setPage, toggleMenu, setToggleMenu } = useGlobalContext();
  const navItemStyle = `hover:text-[#775e28] duration-500 ease-in-out cursor-pointer`;
  const navItemSelectedStyle = `text-[#775e28]`;
  const socialIconStyle = `text-white w-[1.5rem] h-[1.5rem] hover:text-[#775e28]`;
  return (
    <>
      <nav
        className='hidden md:flex px-[12vh] h-[12vh] justify-end items-center
      text-white text-[3vh] gap-4 mr-4 lg:gap-6 lg:mr-6'
      >
        <h2
          className={`${navItemStyle} ${page === 0 && 'text-[#775e28]'}`}
          onClick={() => setPage(0)}
        >
          Home
        </h2>
        <h2
          className={`${navItemStyle} ${page === 1 && 'text-[#775e28]'}`}
          onClick={() => setPage(1)}
        >
          Skills
        </h2>
        <h2
          className={`${navItemStyle} ${page === 2 && 'text-[#775e28]'}`}
          onClick={() => setPage(2)}
        >
          Portfolio
        </h2>
        <h2
          className={`${navItemStyle} ${page === 3 && 'text-[#775e28]'}`}
          onClick={() => setPage(3)}
        >
          Contact
        </h2>
      </nav>

      <nav
        className={`absolute top-0 left-0 p-2 md:hidden ${
          toggleMenu && 'bg-[#212121]'
        } z-40 rounded-br-2xl`}
      >
        <div className='flex justify-center items-center gap-4'>
          <CgMenuGridO
            className='text-white text-4xl cursor-pointer'
            onClick={() => setToggleMenu((prev) => !prev)}
          />
          {toggleMenu && (
            <div className='flex gap-4 mr-4 text-white text-lg z-40'>
              <h3
                className={`${navItemStyle} ${
                  page === 0 && navItemSelectedStyle
                }`}
                onClick={() => {
                  setPage(0);
                  setToggleMenu(false);
                }}
              >
                Home
              </h3>
              <h3
                className={`${navItemStyle} ${
                  page === 1 && navItemSelectedStyle
                }`}
                onClick={() => {
                  setPage(1);
                  setToggleMenu(false);
                }}
              >
                Skills
              </h3>
              <h3
                className={`${navItemStyle} ${
                  page === 2 && navItemSelectedStyle
                }`}
                onClick={() => {
                  setPage(2);
                  setToggleMenu(false);
                }}
              >
                Portfolio
              </h3>
              <h3
                className={`${navItemStyle} ${
                  page === 3 && navItemSelectedStyle
                }`}
                onClick={() => {
                  setPage(3);
                  setToggleMenu(false);
                }}
              >
                Contact
              </h3>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Menu;
