import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/client/Navbar/Navbar';
import Footer from '@/components/client/Footer/Footer';
// import { ThemeContextProvider } from '@/context/ThemeContext';
import { ThemeProvider } from '@/providers/ThemeProvider';
// import { CreatePostContextProvider } from '@/context/CreatePostContext';
import AuthProvider from '@/providers/AuthProvider';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Scribbly',
  description: 'Where ideas go to scribble and shine',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          {/* <ThemeContextProvider> */}
            <ThemeProvider>
                <div className='page-container'>
                  <div className='wrapper'>
                    <Navbar />
                    <div className='content'>{children}</div>
                    <Footer />
                  </div>
                </div>
            </ThemeProvider>
          {/* </ThemeContextProvider> */}
          <Toaster
            position='top-center'
            richColors
            duration={2000}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
