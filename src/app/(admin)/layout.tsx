import '../globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/admin/Toaster/Toaster';
import Provider from '@/providers/ChakraProvider';
import AuthProvider from '@/providers/AuthProvider';
import Sidebar from '@/components/admin/Sidebar/Sidebar';
import { Box, Flex } from '@chakra-ui/react';
import Header from '@/components/admin/Header/Header';
import Breadcrumbs from '@/components/admin/Breadcrumbs/Breadcrumbs';
import { Suspense } from 'react';
import Loading from './admin/loading';
// import { Toaster } from 'sonner';
const inter = Inter({
  subsets: ['latin'],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang='en'
    >
      <body className={inter.className}>
        <Provider>
          <AuthProvider>
            <Provider>
              <Flex
                h={'100vh'}
                overflow={'hidden'}
              >
                <Sidebar />
                <Box
                  w={'100%'}
                  overflow={'auto'}
                >
                  <Header />
                  <Breadcrumbs />
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </Box>
              </Flex>
              <Toaster />
            </Provider>
          </AuthProvider>
          {/* <Toaster /> */}
        </Provider>
      </body>
    </html>
  );
}
