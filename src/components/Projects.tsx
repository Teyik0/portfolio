import ProjectItem from "./ProjectItem";

const enhancedchatgptclone = {
  project: "https://enhanced-gpt.netlify.app/",
  github: "https://github.com/Teyik0/Enhanced-ChatGPT-Clone",
  youtube:
    "https://www.youtube.com/watch?v=logTaDXg-p4&ab_channel=Th%C3%A9oSamarasinghe",
};
const krypt = {
  project: "https://kryptongoerli.netlify.app/",
};
const indiancoffee = {
  project: "https://indiancoffee.fr/",
};
const srikastore = {
  youtube: "https://youtu.be/ecVZBJZusk0",
  github: "https://github.com/Teyik0/srika-store",
};
const epitact = {
  youtube: "https://youtube.com/shorts/e7I4HjtPEDA?feature=share",
};
const robotsuiveur = {
  project: "https://theo-old-portfolio.netlify.app/portfolio/robot-suiveur",
};
const laserChat = {
  project: "https://theo-old-portfolio.netlify.app/portfolio/laser-pour-chat",
};
const listx = {
  project: "https://theo-old-portfolio.netlify.app/portfolio/listx",
};

const Projects = () => {
  return (
    <section className="flex flex-col h-[100vh] md:h-full md:justify-center md:items-center">
      <h1 className="md:hidden uppercase text-center text-white text-5xl pt-2">
        Projects
      </h1>

      <div className="flex flex-wrap gap-8 justify-center py-4 overflow-auto">
        <ProjectItem
          name="Enhanced ChatGPT Clone"
          category={["NextJS13", "Prisma", "TailwindCSS", "Typescript"]}
          cover="bg-[url('/img/enhancedgptchat.png')]"
          url={enhancedchatgptclone}
        />
        <ProjectItem
          name="Krypt - (Crypto Goerli Testnet)"
          category={["NextJS12", "TailwindCSS", "Javascript", "Solidity"]}
          cover="bg-[url('/img/Web3-0.png')]"
          url={krypt}
        />
        <ProjectItem
          name="Indian Coffee"
          category={["NextJS12", "TailwindCSS", "Typescript"]}
          cover="bg-[url('/img/Indian-Coffe.png')]"
          url={indiancoffee}
        />
        <ProjectItem
          name="Srika Store"
          category={[
            "NextJS12",
            "TailwindCSS",
            "Typescript",
            "Stripe",
            "Sanity",
            "Zustand",
          ]}
          cover="bg-[url('/img/ecommerce/im1.png')]"
          url={srikastore}
        />
        <ProjectItem
          name="Epitact - React Native"
          category={["React Native", "Typescript", "Jotai"]}
          cover="bg-[url('/img/Epitact.jpg')]"
          url={epitact}
        />
        <ProjectItem
          name="Robot Suiveur"
          category={["Embarqué", "Arduino", "C"]}
          cover="bg-[url('/img/robot_suiveur/robotsuiveur.png')]"
          url={robotsuiveur}
        />
        <ProjectItem
          name="Laser automatique pour chat"
          category={["Embarqué", "Arduino", "C"]}
          cover="bg-[url('/img/laser_chat/laserchat.png')]"
          url={laserChat}
        />
        <ProjectItem
          name="ListX - Base de donnée utilisateur"
          category={["Qt Framework", "C++"]}
          cover="bg-[url('/img/listx/listx.png')]"
          url={listx}
        />
      </div>
    </section>
  );
};

export default Projects;
