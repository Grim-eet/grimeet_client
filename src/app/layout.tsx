import type {Metadata} from 'next';
import './globals.css';

import ReactQueryClientProvider from '../../config/ReactQueryClientProvider';
import {Navbar} from './components/common/Navbar';

export const metadata: Metadata = {
  title: 'Grimeet',
  description: '함께 꿈을 그려보아요',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=close"
          />
        </head>

        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
