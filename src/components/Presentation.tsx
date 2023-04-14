/* eslint-disable @next/next/no-img-element */
import Encadre from './Encadre';

const Presentation = () => {
  return (
    <section className='flex flex-col lg:flex-row h-[100vh] justify-center items-center p-8 lg:p-0'>
      <div
        className='flex flex-col lg:flex-row w-full md:justify-center
       lg:justify-evenly items-center mt-[3rem]'
      >
        <div
          className='w-[14rem] h-[14rem] xs:w-[16rem] xs:h-[16rem] lg:w-[32vh] lg:h-[32vh] 
        rounded-3xl rotate-45 overflow-hidden opacity-80 lg:mr-16'
        >
          <img
            src='/profile.jpg'
            alt='photo'
            className='-rotate-45 max-w-[100%] scale-[1.48] translate-x-[3rem]'
          />
        </div>
        <div
          className='text-center mt-24 lg:mt-0 lg:text-left 
        md:w-[600px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px]'
        >
          <h1 className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white'>
            <span className='font-bold'>Théo</span> Samarasinghe
          </h1>
          <h2 className='text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white mt-2'>
            Developer fullstack / web3 / front end
          </h2>
          <p
            className='mt-4 lg:mt-8 text-white italic opacity-50
            text-sm lg:text-base xl:text-lg 2xl:text-xl'
          >
            &quot;Passionate about computers and economics, the intersection of
            these two worlds, cryptocurrency became an obvious choice for me.
            The web 3 is still in its infancy.&quot;
          </p>
        </div>
      </div>
    </section>
  );
};

export default Presentation;
