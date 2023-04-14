import Link from 'next/link';
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import Menu from './Menu';

const Encadre = () => {
  return (
    <>
      <div
        className='w-full h-[1px] bg-white absolute top-[12vh] opacity-20
        hidden md:flex'
      />
      <div
        className='w-full h-[1px] bg-white absolute bottom-[12vh] opacity-20
        hidden md:flex'
      />
      <div
        className='w-[1px] h-[100vh] bg-white absolute left-[12vh] opacity-20
        hidden md:flex'
      />
      <div
        className='w-[1px] h-[100vh] bg-white absolute right-[12vh] opacity-20
        hidden md:flex'
      />

      <div className='absolute hidden md:flex md:flex-col top-[1rem] md:top-[16vh] left-8 md:left-[4vh] pt-[4vh] z-40'>
        <Link
          href='https://www.facebook.com/theo.samarasinghe/'
          target='_blank'
        >
          <BsFacebook
            className='text-white w-[2rem] h-[2rem] md:h-[4vh] md:w-[4vh] mr-[1rem] md:mb-[2rem]
          hover:text-[#775e28]'
          />
        </Link>
        <Link href='https://www.instagram.com/theo.sama/' target='_blank'>
          <BsInstagram
            className='text-white w-[2rem] h-[2rem] md:h-[4vh] md:w-[4vh] mr-[1rem] md:mb-[2rem]
          hover:text-[#775e28]'
          />
        </Link>
        <Link
          href='https://www.linkedin.com/in/th%C3%A9o-samarasinghe/'
          target='_blank'
        >
          <BsLinkedin
            className='text-white w-[2rem] h-[2rem] md:h-[4vh] md:w-[4vh]
          hover:text-[#775e28]'
          />
        </Link>
      </div>

      <Menu />
    </>
  );
};

export default Encadre;
