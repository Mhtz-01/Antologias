import Navbar from '@/components/navbar';
import './globals.css';
import Footer from '@/components/footer';
import { AuthProvider } from '@/domain/context/authContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <title>Antologias</title>
      <body>
        <AuthProvider>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
