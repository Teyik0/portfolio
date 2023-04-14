'use client';

import { useGlobalContext } from '@/context/store';
import { Presentation, Skills, Projects, Contact } from '../components';

export default function Home() {
  const { page } = useGlobalContext();
  return (
    <main className='md:px-[12vh] md:pb-[12vh] md:h-[88vh] text-white overflow-hidden'>
      {page === 0 && <Presentation />}
      {page === 1 && <Skills />}
      {/* {page === 2 && <Projects />} */}
      {/* {page === 3 && <Contact />} */}
    </main>
  );
}
