import { promises as fsPromises } from 'fs';
import path from 'path';

export async function getChapterContent(filename: string): Promise<string> {
  const contentDirectory = path.join(process.cwd(), 'src/content');
  const fullPath = path.join(contentDirectory, filename);
  
  try {
    const content = await fsPromises.readFile(fullPath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error reading file ${fullPath}:`, error);
    return '';
  }
}

export async function getAllChapters(): Promise<{ slug: string; title: string }[]> {
  const contentDirectory = path.join(process.cwd(), 'src/content');
  
  try {
    const filenames = await fsPromises.readdir(contentDirectory);
    const chapterFiles = filenames.filter(filename => 
      filename.startsWith('chapter') && filename.endsWith('.md')
    );
    
    const chapters = chapterFiles.map(filename => {
      // Extract chapter number from filename (e.g., "chapter1_introduction.md" -> "1")
      const chapterMatch = filename.match(/chapter(\d+)_/);
      const chapterNum = chapterMatch ? chapterMatch[1] : '0';
      
      // Extract title from filename (e.g., "chapter1_introduction.md" -> "introduction")
      const titleMatch = filename.match(/chapter\d+_(.+)\.md/);
      const slug = filename.replace('.md', '');
      const rawTitle = titleMatch ? titleMatch[1] : 'unknown';
      
      // Format title (e.g., "introduction" -> "Introduction")
      const title = `Chapter ${chapterNum}: ${rawTitle.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')}`;
      
      return { slug, title };
    });
    
    // Sort chapters by number
    return chapters.sort((a, b) => {
      const aNum = parseInt(a.slug.match(/chapter(\d+)/)?.[1] || '0');
      const bNum = parseInt(b.slug.match(/chapter(\d+)/)?.[1] || '0');
      return aNum - bNum;
    });
  } catch (error) {
    console.error('Error reading chapters directory:', error);
    return [];
  }
}
