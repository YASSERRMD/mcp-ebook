"use client"

import React from 'react';
import Link from 'next/link';

interface ChapterNavigationProps {
  chapters: { slug: string; title: string }[];
  currentSlug?: string;
}

const ChapterNavigation: React.FC<ChapterNavigationProps> = ({ chapters, currentSlug }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sticky top-4">
      <h3 className="text-lg font-bold mb-3 border-b pb-2">Chapters</h3>
      <nav>
        <ul className="space-y-1">
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link 
                href={`/chapters/${chapter.slug}`}
                className={`block px-3 py-2 rounded-md text-sm ${
                  currentSlug === chapter.slug 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ChapterNavigation;
