import Sidebar from '@/components/layout/Sidebar';
import './globals.css'; // Harus ada!

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden antialiased">
        {/* Bungkus children di dalam komponen Sidebar */}
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}