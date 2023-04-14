'use client';

import { useState } from 'react';
import {
  Contact,
  Encadre,
  Presentation,
  Projects,
  Skills,
} from '../components';

export default function Home() {
  const [page, setPage] = useState(0);

  return (
    <main>
      <Encadre page={page} setPage={setPage} />
      {page === 0 && <Presentation />}
      {page === 1 && <Skills />}
      {page === 2 && <Projects />}
      {page === 3 && <Contact />}
    </main>
  );
}
