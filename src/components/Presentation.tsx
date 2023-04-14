/* eslint-disable @next/next/no-img-element */
const Presentation = () => {
  return (
    <section
      className='flex flex-col lg:flex-row justify-evenly items-center 
      h-[100vh] md:h-full p-8 lg:p-0'
    >
      <div className='avatar'>
        <div className='w-[40vh] mask mask-hexagon'>
          <img src='/profile.jpg' alt='profilephoto' />
        </div>
      </div>

      <div
        className='text-center lg:mt-0 lg:text-left
        lg:w-[600px]'
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
          these two worlds, cryptocurrency became an obvious choice for me. The
          web 3 is still in its infancy.&quot;
        </p>
      </div>
    </section>
  );
};

export default Presentation;
