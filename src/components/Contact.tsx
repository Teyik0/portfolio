import { SiMinutemailer, SiBitcoin } from 'react-icons/si';
import { BsPhone } from 'react-icons/bs';

const Contact = () => {
  return (
    <section className='flex flex-col lg:flex-row h-[100vh] justify-center items-center p-8 lg:p-0'>
      <div className='flex flex-wrap gap-16 text-white justify-center items-center p-[12vh]'>
        <a
          href='mailto:sat.theo.fr@icloud.com'
          className='flex flex-col justify-center items-center hover:text-[#775e28] cursor-pointer duration-300
        ease-in-out'
        >
          <SiMinutemailer className='text-8xl text-[#775e28] mb-4' />
          <h2 className='text-2xl'>sat.theo.fr@icloud.com</h2>
        </a>
        <div
          className='flex flex-col justify-center items-center hover:text-[#775e28] cursor-pointer duration-300
        ease-in-out'
        >
          <BsPhone className='text-8xl text-[#775e28] mb-4' />
          <h2 className='text-2xl'>06 98 75 54 79</h2>
        </div>
        <div
          className='flex flex-col justify-center items-center hover:text-[#775e28] cursor-pointer duration-300
        ease-in-out'
          onClick={() => {
            navigator.clipboard.writeText(
              '0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752'
            );
            alert('Address copied to clipboard, you can send coin !');
          }}
        >
          <SiBitcoin className='text-8xl text-[#775e28] mb-4' />
          <h2 className='text-2xl'>
            {'0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752'.slice(0, 5)}...
            {'0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752'?.slice(
              '0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752'.length - 4
            )}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Contact;
