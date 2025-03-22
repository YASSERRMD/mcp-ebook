"use client"

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';

interface SearchBarProps {
  chapters: { slug: string; title: string }[];
}

const SearchBar: React.FC<SearchBarProps> = ({ chapters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ slug: string; title: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 2) {
      setIsSearching(true);
      const results = chapters.filter(chapter => 
        chapter.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search chapters..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg 
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
      
      {isSearching && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchResults.length > 0 ? (
            <ul className="py-1">
              {searchResults.map((result) => (
                <li key={result.slug}>
                  <Link 
                    href={`/chapters/${result.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setSearchTerm('');
                      setIsSearching(false);
                    }}
                  >
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
