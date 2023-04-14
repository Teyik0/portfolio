import ProjectItem from './ProjectItem';
import Link from 'next/link';

const Projects = () => {
  return (
    <section className='flex flex-col h-[100vh] md:h-full md:justify-center md:items-center'>
      <h1 className='md:hidden uppercase text-center text-white text-5xl pt-2'>
        Projects
      </h1>

      <div className='flex flex-wrap gap-8 justify-center py-4 overflow-auto'>
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
        <ProjectItem
          name='ListX - Base de donnée utilisateur'
          category='test'
          cover="bg-[url('/img/listx/listx.png')]"
        />
      </div>
    </section>
  );
};

export default Projects;
