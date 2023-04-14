import './globals.css';
import { Encadre } from '@/components';
import { GlobalContextProvider } from '@/context/store';

export const metadata = {
  title: 'Theo - Portfolio 2023',
  description: 'Découvrez mon portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fr'>
      <body>
        <GlobalContextProvider>
          <Encadre />
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
