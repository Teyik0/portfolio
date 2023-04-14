import './globals.css';

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
      <body className=''>{children}</body>
    </html>
  );
}
