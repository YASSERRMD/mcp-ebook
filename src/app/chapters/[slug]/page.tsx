import { getChapterContent, getAllChapters } from '@/lib/chapters';
import MarkdownContent from '@/components/MarkdownContent';
import Link from 'next/link';
import ChapterNavigation from '@/components/ChapterNavigation';
import SearchBar from '@/components/SearchBar';

export async function generateStaticParams() {
  const chapters = await getAllChapters();
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const chapters = await getAllChapters();
  const {slug} = await params;
  const chapter = chapters.find((c) => c.slug === slug);
  
  return {
    title: `${chapter?.title || slug} - MCP Guide`,
    description: `Learn about ${chapter?.title || 'the Model Context Protocol'} in this comprehensive guide`,
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params; // ✅ Again, no await
  const content = await getChapterContent(`${slug}.md`);
  const chapters = await getAllChapters();
  const currentIndex = chapters.findIndex((c) => c.slug === slug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar chapters={chapters} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <ChapterNavigation chapters={chapters} currentSlug={slug} />
        </div>
        
        <div className="md:w-3/4">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:underline">
              ← Back to Table of Contents
            </Link>
          </div>
          
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <MarkdownContent content={content} />
          </article>
          
          <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
            {prevChapter ? (
              <Link 
                href={`/chapters/${prevChapter.slug}`} 
                className="btn btn-secondary flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Chapter
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextChapter ? (
              <Link 
                href={`/chapters/${nextChapter.slug}`} 
                className="btn btn-primary flex items-center"
              >
                Next Chapter
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
