import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Model Context Protocol (MCP) - A Comprehensive Guide',
  description: 'A comprehensive guide to the Model Context Protocol (MCP), from basic concepts to advanced implementation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold">Model Context Protocol</h1>
                <p className="text-blue-100">A Comprehensive Guide</p>
              </div>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="hover:text-blue-200 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/#chapters" className="hover:text-blue-200 transition-colors">
                      Chapters
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>© 2025 Model Context Protocol Guide</p>
              <p className="mt-2">Created by Manus AI</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
