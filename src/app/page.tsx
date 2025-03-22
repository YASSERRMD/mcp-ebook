import { getAllChapters } from  '@/lib/chapters';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export const metadata = {
  title: 'Model Context Protocol (MCP) - A Comprehensive Guide',
  description: 'A comprehensive guide to the Model Context Protocol (MCP), from basic concepts to advanced implementation',
};

export default async function Home() {
  const chapters = await getAllChapters();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <SearchBar chapters={chapters} />
        </div>
        
        <div className="text-center mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold mb-4">The Model Context Protocol (MCP)</h1>
          <h2 className="text-2xl mb-2">A Comprehensive Guide</h2>
          <p className="text-xl italic mb-4">From Basic Concepts to Advanced Implementation</p>
          <div className="border-t border-gray-300 w-1/3 mx-auto my-6"></div>
          <p className="text-lg">By Manus AI</p>
          <p className="text-md">March 2025</p>
        </div>
        
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" id="chapters">
          <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {chapters.map((chapter) => (
              <li key={chapter.slug} className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors">
                <Link href={`/chapters/${chapter.slug}`} className="text-blue-600 hover:underline block">
                  {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="prose max-w-none bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2>About This Guide</h2>
          <p>
            This comprehensive guide explores the Model Context Protocol (MCP), a revolutionary open standard 
            that standardizes how applications provide context to Large Language Models. Starting from fundamental 
            concepts and building to advanced technical details, this guide provides a complete understanding of 
            MCP&apos;s architecture, implementation, and future potential.
          </p>
          
          <h2>How to Use This Guide</h2>
          <p>
            This guide is designed to be read sequentially, starting with basic concepts and progressively 
            moving to more advanced topics. However, each chapter is also self-contained, allowing you to 
            jump directly to topics of interest. Use the table of contents above to navigate between chapters.
          </p>
          
          <h2>Who This Guide Is For</h2>
          <p>
            This guide is suitable for both beginners and professionals:
          </p>
          <ul>
            <li>Developers looking to implement MCP in their applications</li>
            <li>Technical leaders evaluating MCP for their organizations</li>
            <li>AI researchers interested in context provision mechanisms</li>
            <li>Students learning about AI integration standards</li>
            <li>Anyone interested in understanding how AI systems connect to data sources</li>
          </ul>
          
          <div className="mt-8">
            <Link href={`/chapters/${chapters[0]?.slug}`} className="btn btn-primary inline-flex items-center">
              Start Reading
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
