"use client";

import Link from "next/link";
import { SiMinutemailer, SiBitcoin } from "react-icons/si";
import { BsPhone, BsGithub } from "react-icons/bs";
import { TbBrandLinkedin } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const contactItemStyle = `flex flex-col justify-center items-center hover:text-[#775e28] 
  cursor-pointer duration-300 ease-in-out w-[200px] h-[200px] bg-[#1a1a1a] rounded-2xl`;
  return (
    <section
      className="flex flex-wrap gap-8 h-[100vh] md:h-full justify-center items-center overflow-auto
    text-white text-lg lg:text-xl p-8 md:p-0"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Link href="mailto:theosamarasinghe@gmail.com" target="_blank">
        <div className={`${contactItemStyle}`}>
          <SiMinutemailer className="text-8xl text-[#775e28] mb-4" />
          <h2 className="text-center">
            theosamarasinghe
            <br />
            @gmail.com
          </h2>
        </div>
      </Link>

      <div className={`${contactItemStyle}`}>
        <BsPhone className="text-8xl text-[#775e28] mb-4" />
        <h2>06 98 75 54 79</h2>
      </div>

      <Link
        href="https://www.linkedin.com/in/th%C3%A9o-samarasinghe/"
        target="_blank"
      >
        <div className={`${contactItemStyle}`}>
          <TbBrandLinkedin className="text-8xl text-[#775e28] mb-4" />
          <h2>Linkedin</h2>
        </div>
      </Link>

      <Link href="https://github.com/teyik0" target="_blank">
        <div className={`${contactItemStyle}`}>
          <BsGithub className="text-8xl text-[#775e28] mb-4" />
          <h2>Github</h2>
        </div>
      </Link>

      <div
        className={`${contactItemStyle}`}
        onClick={() => {
          navigator.clipboard.writeText(
            "0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752"
          );
          toast.success("Address copied to clipboard, you can send coin !");
        }}
      >
        <SiBitcoin className="text-8xl text-[#775e28] mb-4" />
        <h2>
          {"0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752".slice(0, 5)}...
          {"0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752"?.slice(
            "0x5cDf2e6f19348cc7da8B74ecF9b2A030Dc3aC752".length - 4
          )}
        </h2>
      </div>
    </section>
  );
};

export default Contact;
