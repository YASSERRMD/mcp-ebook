import { getChapterContent } from '@/lib/chapters';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
 
  const { slug } = await params;
  const content = await getChapterContent(`${slug}.md`);

  return new Response(content, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
