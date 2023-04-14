import Link from 'next/link';
import { SiMinutemailer, SiBitcoin } from 'react-icons/si';
import { BsPhone } from 'react-icons/bs';
import { TbBrandLinkedin } from 'react-icons/tb';

const Contact = () => {
  const contactItemStyle = `flex flex-col justify-center items-center hover:text-[#775e28] 
  cursor-pointer duration-300 ease-in-out w-[200px] h-[200px] bg-[#1a1a1a] rounded-2xl`;
  return (
    <section
      className='flex flex-wrap gap-8 h-[100vh] md:h-full justify-center items-center overflow-auto
    text-white text-lg lg:text-xl p-8 md:p-0'
    >
      <Link href='mailto:theosamarasinghe@gmail.com'>
        <div className={`${contactItemStyle}`}>
          <SiMinutemailer className='text-8xl text-[#775e28] mb-4' />
          <h2 className='text-center'>
            theosamarasinghe
            <br />
            @gmail.com
          </h2>
        </div>
      </Link>

      <div className={`${contactItemStyle}`}>
        <BsPhone className='text-8xl text-[#775e28] mb-4' />
        <h2>06 98 75 54 79</h2>
      </div>

      <div className={`${contactItemStyle}`}>
        <TbBrandLinkedin className='text-8xl text-[#775e28] mb-4' />
        <h2>Linkedin</h2>
      </div>

      <div
        className={`${contactItemStyle}`}
        onClick={() => {
          navigator.clipboard.writeText(
            '0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752'
          );
          alert('Address copied to clipboard, you can send coin !');
        }}
      >
        <SiBitcoin className='text-8xl text-[#775e28] mb-4' />
        <h2>
          {'0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752'.slice(0, 5)}...
          {'0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752'?.slice(
            '0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752'.length - 4
          )}
        </h2>
      </div>
    </section>
  );
};

export default Contact;
